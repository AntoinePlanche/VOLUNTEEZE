import os
import re
import sys
import csv
import json
import time
import pytz
import pprint
import pickle
import argparse
import datetime
import numpy as np
import mysql.connector
from enum import Enum

class ConnectionWrapper (object):
	"""Interface of a technology-independant,
	   simple SQL database connection wrapper
	   for the simple use cases we got here"""
	def execute(self, query):
		NotImplemented

	def commit(self):
		NotImplemented

	def close(self):
		NotImplemented

class MySQLConnectionWrapper (object):
	def __init__(self, host, port, database, user, password):
		self.user = user
		self.password = password
		self.host = host
		self.port = port
		self.database = database
		self.cursor = None
		self.db = None

	def connect(self):
		self.db = mysql.connector.connect(user=self.user, password=self.password, host=self.host, port=self.port, database=self.database)
		self.cursor = self.db.cursor()

	def disconnect(self):
		self.cursor.close()
		self.db.close()

	def execute(self, query):
		try:
			self.cursor.execute(query)
		except (mysql.connector.IntegrityError, mysql.connector.ProgrammingError) as e:
			print("\nERROR :", e)
			with open("faultyquery.sql", "w", encoding="utf-8") as f:
				f.write("-- " + str(e) + "\n")
				f.write(query)

	def commit(self):
		self.db.commit()
		self.cursor.close()
		self.cursor = self.db.cursor()

	def close(self):
		if self.cursor is not None:
			self.cursor.close()
			self.cursor = None
		if self.db is not None:
			self.db.close()
			self.db = None

	def astuple(self):
		return (self.host, self.port, self.database, self.user, self.password)




class Table (object):
	"""Superclass for DB tables.
	   Needs to be subclassed once for each table"""

	def __init__(self, name):
		self.name = name
		self._columns = self.columns()
		self._dependencies = set()
		self._primary_key = []

		# Pre-extract the primary and foreign keys from the column definitions
		for colname, (type, primary_key, foreign_key) in self._columns.items():
			if primary_key:
				self._primary_key.append(colname)
			if foreign_key is not None:
				self._dependencies.add(foreign_key)

	def columns(self):
		"""Return the columns {name: (type, pk, fk), ...}"""
		NotImplemented

	def indexes(self):
		"""Return the additional indexes {column name: unique, ...}"""
		return {}

	def dependencies(self):
		"""Return the names of the other tables this one depends onto"""
		return self._dependencies

	def primary_key(self):
		"""Return the primary key columns"""
		return self._primary_key

	def extract_key(self, row):
		"""Extract the primary key fields in the given row"""
		return tuple([row[pk_element] for pk_element in self.primary_key()])

	def add_filters(self, *filters):
		"""Add row filters to the table"""
		self.filters.extend(filters)

	def additional_constraints(self):
		return ""


# DB type aliases
Int = ("INTEGER", "INTEGER")
String = ("TEXT", "TINYTEXT")
Str = lambda size=None: ("TEXT", f"VARCHAR({size if size is not None else 255})")
Text = ("TEXT", "TEXT")
Float = ("FLOAT", "FLOAT")
Bool = ("BOOLEAN", "BOOLEAN")
Date = ("DATE", "DATE")
Datetime = ("DATETIME", "DATETIME")



def convert_value(value, type, emptyisnull=False):
	"""Convert a value from the base file to a python representation"""
	if type[0] == "INTEGER":
		return int(value) if value != "" else None
	elif type[0] == "FLOAT":
		return float(value) if value != "" else None
	elif type[0] == "BOOLEAN":
		if value.lower() in ("0", "false"):
			return False
		elif value.lower() in ("1", "true"):
			return True
		else:
			return bool(int(value)) if value != "" else None
	elif type[0] == "TEXT":
		return value if value != "" else (None if emptyisnull else value)
	elif type[0] == "DATE":
		return datetime.date.fromisoformat(value) if value != "" else None
	elif type[0] == "DATETIME":
		return datetime.datetime.strptime(value, "%a %b %d %H:%M:%S %z %Y").astimezone(pytz.utc) if value != "" else None

def convert_insert(value, type):
	"""Convert a value to its SQL representation"""
	if value is None:
		return "NULL"
	elif type[0] in ("INTEGER", "FLOAT"):
		return str(value)
	elif type[0] == "BOOLEAN":
		return "TRUE" if value else "FALSE"
	elif type[0] == "TEXT":
		return "'" + value.replace("\\", r"\\").replace("'", r"\'").replace("\n", r"\n").replace("\t", r"\t") + "'"
	elif type[0] == "DATE":
		return "'" + value.isoformat() + "'"
	elif type[0] == "DATETIME":
		return "'" + value.strftime("%Y-%m-%d %H:%M:%S") + "'"


# Table names enumeration
class TableName:
	Benevole = "BENEVOLE"
	Activite = "ACTIVITE"
	Association = "ASSOCIATION"
	Faitpartiede = "FAIT_PARTIE_DE"
	Participea = "PARTICIPE_A"
	
	


########## Table definitions
class BenevoleTable (Table):
	def columns(self):
		return {
			"email":          		(Str(40), 	True,  None),
			"nom":               	(String, 	False, None),
			"prenom":     			(String, 	False, None),
			"date_de_naissance":    (Date,   	False, None),
			"adresse": 				(Str(70), 	False, None),
   			"biographie":			(Text, 		False, None),
      		"centre_interet":		(Str(60), 	False, None)}

class AssociationTable (Table):
	def columns(self):
		return {
			"association_id": 		(Int,		True,  None),
			"nom":   				(String,	False,  None),
			"adresse":				(Str(70), 	False, None),
   			"Description": 			(Text, 		False, None),
      		"Secteur d'activité": 	(Str(70), 	False, None)}

class ActiviteTable (Table):
	def columns(self):
		return {
			"activite_id":			(Int,		True,  None),
			"association_id": 		(Int,		True,  TableName.Association),
			"nom":           		(String,	False, None),
			"Secteur d'activité": 	(Str(70), 	False, None),
			"description":         	(Text,  	False, None),
			"localisation":        	(Str(70),  	False, None)}

class FaitpartiedeTable (Table):
	def columns(self):
		return {
			"email": 			(Str(40), 	True, TableName.Benevole),
			"association_id":   (Int, 		True, TableName.Association),
   			"droit":			(Int, 		True, None)}

class ParticipeaTable (Table):
	def columns(self):
		return {
			"email": 			(Str(40), 	True, TableName.Benevole),
			"activite_id":		(Int,		True, TableName.Activite)}


# Map the table names to their related table object
table_classes = {
	TableName.Benevole: BenevoleTable(TableName.Benevole),
	TableName.Activite: ActiviteTable(TableName.Activite),
	TableName.Association: AssociationTable(TableName.Association),
	TableName.Faitpartiede: FaitpartiedeTable(TableName.Faitpartiede),
	TableName.Participea: ParticipeaTable(TableName.Participea)}


class TableImport (object):
	"""Holds the state of a table import"""

	def __init__(self, connectinfo, table):
		self.connectinfo = connectinfo
		self.table = table
		self.imported_keys = set()

	def start(self):
		self.connection = MySQLConnectionWrapper(*self.connectinfo)

	def stop(self):
		self.connection = None

	def drop(self, log):
		log.section(f"Dropping table {self.table.name}")
		self.connection.connect()
		self.connection.execute(f"DROP TABLE IF EXISTS {self.table.name};")
		self.connection.commit()
		self.connection.disconnect()

	def create(self, log):
		log.section(f"Creating table {self.table.name}")
		"""Drop the table if it already exists, and create it"""
		self.connection.connect()
		columns = ""
		constraints = ""

		constraints += f"PRIMARY KEY ({','.join(self.table.primary_key())}),\n"

		for colname, (type, primary_key, foreign_key) in self.table.columns().items():			
			columns += f"{colname} {type[1]},\n"

			if foreign_key is not None:
				if foreign_key not in table_classes:
					log.warning(f"Column {colname} in table {self.table.name} references the undefined table {foreign_key}. The foreign key constraint has been dropped")
				else:
					foreign_table = table_classes[foreign_key]
					foreign_pk = foreign_table.primary_key()
					
					if foreign_pk is None:
						log.warning(f"Table {foreign_key}, referenced by column {colname} in table {self.table.name}, has no primary key. The foreign key constraint has been dropped")
					elif len(foreign_pk) > 1:
						log.warning(f"Column {colname} in table {self.table.name} references the composite primary key of table {foreign_key}. The foreign key constraint has been dropped")
					else:
						constraints += f"FOREIGN KEY ({colname}) REFERENCES {foreign_key}({foreign_pk[0]}),\n"

		constraints += self.table.additional_constraints()

		if constraints != "":
			constraints = constraints.rstrip("\n,")
		else:
			columns = columns.rstrip("\n,")

		self.connection.execute(f"CREATE TABLE {self.table.name} ({columns} {constraints});")

		# Generate indexes
		for colname, unique in self.table.indexes().items():
			self.connection.execute(f"CREATE {'UNIQUE ' if unique else ''}INDEX idx__{self.table.name}__{colname} ON {self.table.name}({colname});")

		self.connection.commit()
		self.connection.disconnect()


def resolve_import_order(log):
	"""Resolve the tables’ interdependencies to make a coherent import order"""
	order = []
	passes = 0
	while len(order) < len(table_classes):
		for tablename, table in table_classes.items():
			if tablename not in order and all([
							dependency in order or dependency not in table_classes
							for dependency in table.dependencies()
							if dependency != tablename]):
				order.append(tablename)
		passes += 1
		if passes > len(table_classes) + 1:
			log.error("Endless loop in import order resolution. A circular dependency is plausible.")
			exit(5)
	return order

def table_dependencies():
	dependencies = {}
	for tablename, table in table_classes.items():
		dependencies[tablename] = [dep for dep in table.dependencies() if dep != tablename]
	return dependencies

def drop_tables(log, processes:dict):
	log.title("Dropping previous tables")
	import_order = resolve_import_order(log)
	for tablename in reversed(import_order):
		process = processes[tablename]
		process.start()
		process.drop(log)
		process.stop()

def import_table(log, processes:dict, tablename:str, *args):
	log.title(f"Importing table {tablename}")
	process = processes[tablename]
	process.start()
	process.drop(log)
	process.create(log)
	process.stop()
	log.close()
	return process


# For https://dbdiagram.io/d
def generate_diagram(log):
	import_order = resolve_import_order(log)
	with open("diagram.txt", "w", encoding="utf-8") as er:
		for tablename in import_order:
			table = table_classes[tablename]
			foreignkeys = {}
			er.write(f"Table {tablename} {{\n")
			for colname, (type, pk, fk) in table.columns().items():
				er.write(f"\t{colname} {type[1]}{' [pk]' if pk else ''}\n")
				if fk is not None:
					foreignkeys[f"{tablename}.{colname}"] = f"{fk}.{table_classes[fk].primary_key()[0]}"
			er.write("}\n")

			for local, foreign in foreignkeys.items():
				er.write(f"Ref: {local} > {foreign}\n")


def save_all():
	print("EMERGENCY STOP")
	connection.close()
	savedata = {
		"input_directory": input_directory,
		"current_table": tablename,
		"processes": processes,
		"import_order": import_order,
		"connection_tuple": connection.astuple(),
		"table_classes": table_classes,
	}

	with open("EMERGENCY_SAVE.bak", "wb") as save:
		pickle.dump(savedata, save)
	print("EMERGENCY SAVE SUCCESSFUL, QUITTING")


########## Main script

if __name__ == "__main__":
	parser = argparse.ArgumentParser()
	parser.add_argument("dataset_directory", help="Directory where the dataset files are contained")
	parser.add_argument("--host", help="MySQL server address", default="127.0.0.1")
	parser.add_argument("--port", type=int, help="MySQL server port", default=3306)
	parser.add_argument("-u", "--user", help="MySQL database user name", default="")
	parser.add_argument("-p", "--password", help="MySQL database user password", default="")
	parser.add_argument("-d", "--database", help="Target MySQL database name")
	parser.add_argument("--diagram", action="store_true", help="Generate the ER diagram description", default=False)
	parser.add_argument("--emergencyload", action="store_true", help="Restore an emergency save", default=False)
	args = parser.parse_args()

	if args.emergencyload:
		with open("EMERGENCY_SAVE.bak", "rb") as save:
			print("STARTING FROM AN EMERGENCY SAVE")
			savedata = pickle.load(save)
			input_directory = savedata["input_directory"]
			connection = MySQLConnectionWrapper(*savedata["connection_tuple"])
			processes = savedata["processes"]
			import_order = savedata["import_order"]
			table_classes = savedata["table_classes"]
			tablename = savedata["current_table"]

			for process in processes.values():
				process.connection = connection

			print("PICKING UP INSERTION FROM TABLE", savedata["current_table"])
			current_process = processes[savedata["current_table"]]
			current_process.run(processes, input_directory, restore=True)

			for tablename in import_order[import_order.index(savedata["current_table"])+1:]:
				processes[tablename].run(processes, input_directory)
	else:
		input_directory = args.dataset_directory
		connection = MySQLConnectionWrapper(args.host, args.port, args.database, args.user, args.password)

		processes = {}
		for tablename, table in table_classes.items():
			processes[tablename] = TableImport(connection, table)

		print("\n------ Resolving import order")
		import_order = resolve_import_order(processes)
		print(f"Import order : {', '.join(import_order)}")

		if args.diagram:
			generate_diagram(import_order)
		else:
			print("\n------ Dropping existing tables")
			for tablename in reversed(import_order):
				processes[tablename].drop()

			print("\n------ Importing data")
			for tablename in import_order:
				print("--- Importing table", tablename)
				processes[tablename].run(processes, input_directory)

	connection.close()