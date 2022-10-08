CREATE TABLE `BENEVOLES` (
  `id_benevole` INTEGER PRIMARY KEY,
  `email` TINYTEXT,
  `nom` TINYTEXT,
  `prenom` TINYTEXT,
  `date_de_naissance` DATE,
  `sexe` VARCHAR(1),
  `adresse` TINYTEXT,
  `telephone` VARCHAR(13),
  `date_inscription` DATE,
  `photo_profil` TINYTEXT,
  `description` TEXT,
  `veut_etre_contacter` BOOLEAN
);

CREATE TABLE `ASSOCIATIONS` (
  `id_association` INTEGER PRIMARY KEY,
  `email` TINYTEXT,
  `nom` TINYTEXT,
  `adresse` TINYTEXT,
  `telephone` VARCHAR(13),
  `logo` TINYTEXT,
  `photo_couverture` TINYTEXT,
  `date_inscription` DATE,
  `description` TEXT
);

CREATE TABLE `MISSIONS_DE_BENEVOLAT` (
  `id_mission_de_benevolat` INTEGER PRIMARY KEY,
  `nom` TINYTEXT,
  `localisation` TINYTEXT,
  `debut_mission` DATETIME,
  `fin_mission` DATETIME,
  `age_min` INTEGER,
  `age_max` INTEGER,
  `description` TEXT
);

CREATE TABLE `CENTRES_INTERET` (
  `id_centre_interet` INTEGER PRIMARY KEY,
  `nom_centre_interet` TINYTEXT
);

CREATE TABLE `COMPETENCES` (
  `id_competence` INTEGER PRIMARY KEY,
  `nom_competence` TINYTEXT
);

CREATE TABLE `MISSIONS_DE_BENEVOLAT_INTERETS` (
  `id_mission_de_benevolat` INTEGER,
  `id_centre_interet` INTEGER,
  PRIMARY KEY (`id_mission_de_benevolat`, `id_centre_interet`)
);

CREATE TABLE `ASSOCIATIONS_INTERETS` (
  `id_association` INTEGER,
  `id_centre_interet` INTEGER,
  PRIMARY KEY (`id_association`, `id_centre_interet`)
);

CREATE TABLE `BENEVOLES_INTERETS` (
  `id_benevole` INTEGER,
  `id_centre_interet` INTEGER,
  PRIMARY KEY (`id_benevole`, `id_centre_interet`)
);

CREATE TABLE `BENEVOLES_COMPETENCES` (
  `id_benevole` INTEGER,
  `id_competence` INTEGER,
  PRIMARY KEY (`id_benevole`, `id_competence`)
);

CREATE TABLE `MISSIONS_DE_BENEVOLAT_COMPETENCES` (
  `id_mission_de_benevolat` INTEGER,
  `id_competence` INTEGER,
  PRIMARY KEY (`id_mission_de_benevolat`, `id_competence`)
);

CREATE TABLE `ORGANISE` (
  `id_association` INTEGER,
  `id_mission_de_benevolat` INTEGER,
  PRIMARY KEY (`id_association`, `id_mission_de_benevolat`)
);

CREATE TABLE `FAIT_PARTIE_DE` (
  `id_benevole` INTEGER,
  `id_association` INTEGER,
  `droit` INTEGER,
  `statut` INTEGER,
  PRIMARY KEY (`id_benevole`, `id_association`)
);

CREATE TABLE `PARTICIPE_A` (
  `id_benevole` INTEGER,
  `id_mission_de_benevolat` INTEGER,
  `est_organisateur` BOOLEAN,
  `statut` INTEGER,
  PRIMARY KEY (`id_benevole`, `id_mission_de_benevolat`)
);

ALTER TABLE `MISSIONS_DE_BENEVOLAT_INTERETS` ADD FOREIGN KEY (`id_mission_de_benevolat`) REFERENCES `MISSIONS_DE_BENEVOLAT` (`id_mission_de_benevolat`);

ALTER TABLE `MISSIONS_DE_BENEVOLAT_INTERETS` ADD FOREIGN KEY (`id_centre_interet`) REFERENCES `CENTRES_INTERET` (`id_centre_interet`);

ALTER TABLE `ASSOCIATIONS_INTERETS` ADD FOREIGN KEY (`id_association`) REFERENCES `ASSOCIATIONS` (`id_association`);

ALTER TABLE `ASSOCIATIONS_INTERETS` ADD FOREIGN KEY (`id_centre_interet`) REFERENCES `CENTRES_INTERET` (`id_centre_interet`);

ALTER TABLE `BENEVOLES_INTERETS` ADD FOREIGN KEY (`id_benevole`) REFERENCES `BENEVOLES` (`id_benevole`);

ALTER TABLE `BENEVOLES_INTERETS` ADD FOREIGN KEY (`id_centre_interet`) REFERENCES `CENTRES_INTERET` (`id_centre_interet`);

ALTER TABLE `BENEVOLES_COMPETENCES` ADD FOREIGN KEY (`id_benevole`) REFERENCES `BENEVOLES` (`id_benevole`);

ALTER TABLE `BENEVOLES_COMPETENCES` ADD FOREIGN KEY (`id_competence`) REFERENCES `COMPETENCES` (`id_competence`);

ALTER TABLE `MISSIONS_DE_BENEVOLAT_COMPETENCES` ADD FOREIGN KEY (`id_mission_de_benevolat`) REFERENCES `MISSIONS_DE_BENEVOLAT` (`id_mission_de_benevolat`);

ALTER TABLE `MISSIONS_DE_BENEVOLAT_COMPETENCES` ADD FOREIGN KEY (`id_competence`) REFERENCES `COMPETENCES` (`id_competence`);

ALTER TABLE `ORGANISE` ADD FOREIGN KEY (`id_association`) REFERENCES `ASSOCIATIONS` (`id_association`);

ALTER TABLE `ORGANISE` ADD FOREIGN KEY (`id_mission_de_benevolat`) REFERENCES `MISSIONS_DE_BENEVOLAT` (`id_mission_de_benevolat`);

ALTER TABLE `FAIT_PARTIE_DE` ADD FOREIGN KEY (`id_benevole`) REFERENCES `BENEVOLES` (`id_benevole`);

ALTER TABLE `FAIT_PARTIE_DE` ADD FOREIGN KEY (`id_association`) REFERENCES `ASSOCIATIONS` (`id_association`);

ALTER TABLE `PARTICIPE_A` ADD FOREIGN KEY (`id_benevole`) REFERENCES `BENEVOLES` (`id_benevole`);

ALTER TABLE `PARTICIPE_A` ADD FOREIGN KEY (`id_mission_de_benevolat`) REFERENCES `MISSIONS_DE_BENEVOLAT` (`id_mission_de_benevolat`);

ALTER TABLE `MISSIONS_DE_BENEVOLAT` ADD FOREIGN KEY (`age_max`) REFERENCES `MISSIONS_DE_BENEVOLAT` (`localisation`);
