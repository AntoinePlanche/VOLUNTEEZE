CREATE TABLE `BENEVOLES` (
  `id_benevole` INTEGER PRIMARY KEY,
  `email` VARCHAR(100) UNIQUE NOT NULL,
  `nom` TINYTEXT NOT NULL,
  `prenom` TINYTEXT NOT NULL,
  `date_de_naissance` DATE NOT NULL,
  `sexe` VARCHAR(1) NOT NULL,
  `adresse` TINYTEXT,
  `telephone` VARCHAR(13),
  `date_inscription` DATE NOT NULL,
  `photo_profil` TINYTEXT,
  `description` TEXT,
  `veut_etre_contacter` BOOLEAN NOT NULL
);

CREATE TABLE `ASSOCIATIONS` (
  `id_association` INTEGER PRIMARY KEY,
  `email` VARCHAR(100) UNIQUE NOT NULL,
  `nom` TINYTEXT NOT NULL,
  `adresse` TINYTEXT,
  `telephone` VARCHAR(13),
  `logo` TINYTEXT,
  `photo_couverture` TINYTEXT,
  `date_inscription` DATE NOT NULL,
  `description` TEXT
);

CREATE TABLE `MISSIONS_DE_BENEVOLAT` (
  `id_mission_de_benevolat` INTEGER PRIMARY KEY,
  `nom` TINYTEXT NOT NULL,
  `localisation` TINYTEXT NOT NULL,
  `debut_mission` DATETIME NOT NULL,
  `fin_mission` DATETIME,
  `age_min` INTEGER,
  `age_max` INTEGER,
  `description` TEXT
);

CREATE TABLE `CENTRES_INTERET` (
  `id_centre_interet` INTEGER PRIMARY KEY,
  `nom_centre_interet` TINYTEXT NOT NULL
);

CREATE TABLE `COMPETENCES` (
  `id_competence` INTEGER PRIMARY KEY,
  `nom_competence` TINYTEXT NOT NULL
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
  `droit` INTEGER NOT NULL,
  `statut` INTEGER NOT NULL,
  PRIMARY KEY (`id_benevole`, `id_association`)
);

CREATE TABLE `PARTICIPE_A` (
  `id_benevole` INTEGER,
  `id_mission_de_benevolat` INTEGER,
  `est_organisateur` BOOLEAN NOT NULL,
  `statut` INTEGER NOT NULL,
  PRIMARY KEY (`id_benevole`, `id_mission_de_benevolat`)
);

CREATE TABLE `TYPE_SIGNALEMENT` (
  `id_type_signalement` INTEGER PRIMARY KEY,
  `description_type_signalement` TINYTEXT NOT NULL
);

CREATE TABLE `COMMENTAIRES_BENEVOLE` (
  `id_commentaire` INTEGER PRIMARY KEY,
  `id_benevole` INTEGER NOT NULL,
  `id_association` INTEGER NOT NULL,
  `commentaire` TEXT NOT NULL
);

CREATE TABLE `SIGNALEMENT_BENEVOLE` (
  `id_signalement` INTEGER PRIMARY KEY,
  `id_benevole` INTEGER NOT NULL,
  `id_association` INTEGER NOT NULL,
  `id_type_signalement` INTEGER NOT NULL,
  `commentaire_signalement` TEXT NOT NULL
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

ALTER TABLE `COMMENTAIRES_BENEVOLE` ADD FOREIGN KEY (`id_benevole`) REFERENCES `BENEVOLES` (`id_benevole`);

ALTER TABLE `COMMENTAIRES_BENEVOLE` ADD FOREIGN KEY (`id_association`) REFERENCES `ASSOCIATIONS` (`id_association`);

ALTER TABLE `SIGNALEMENT_BENEVOLE` ADD FOREIGN KEY (`id_benevole`) REFERENCES `BENEVOLES` (`id_benevole`);

ALTER TABLE `SIGNALEMENT_BENEVOLE` ADD FOREIGN KEY (`id_association`) REFERENCES `ASSOCIATIONS` (`id_association`);

ALTER TABLE `SIGNALEMENT_BENEVOLE` ADD FOREIGN KEY (`id_type_signalement`) REFERENCES `TYPE_SIGNALEMENT` (`id_type_signalement`);
