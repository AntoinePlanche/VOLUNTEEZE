-- phpMyAdmin SQL Dump
-- version OVH
-- https://www.phpmyadmin.net/
--
-- Hôte : roobigfappvol.mysql.db
-- Généré le : dim. 09 avr. 2023 à 17:16
-- Version du serveur : 5.7.41-log
-- Version de PHP : 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `roobigfappvol`
--

-- --------------------------------------------------------

--
-- Structure de la table `Association`
--

CREATE TABLE `Association` (
  `id_asso` int(11) NOT NULL,
  `id_compte` int(11) NOT NULL,
  `nom` tinytext NOT NULL,
  `tel` varchar(13) DEFAULT NULL,
  `description` text NOT NULL,
  `adresse` varchar(250) NOT NULL,
  `longitude` float NOT NULL,
  `latitude` float NOT NULL,
  `logo` varchar(200) NOT NULL,
  `couverture` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Benevole`
--

CREATE TABLE `Benevole` (
  `id_benevole` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_role` int(11) NOT NULL,
  `id_asso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Compte`
--

CREATE TABLE `Compte` (
  `id` int(11) NOT NULL,
  `date_inscription` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Log`
--

CREATE TABLE `Log` (
  `id_compte` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_log` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Mission`
--

CREATE TABLE `Mission` (
  `id_mission` int(11) NOT NULL,
  `id_asso` int(11) NOT NULL,
  `titre` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `type` varchar(50) NOT NULL,
  `image` varchar(150) NOT NULL COMMENT 'url',
  `adresse` varchar(200) NOT NULL,
  `longitude` float NOT NULL,
  `latitude` float NOT NULL,
  `debut` datetime NOT NULL,
  `fin` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Organise`
--

CREATE TABLE `Organise` (
  `id_benevole` int(11) NOT NULL,
  `id_mission` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Participe`
--

CREATE TABLE `Participe` (
  `id_mission` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Permission`
--

CREATE TABLE `Permission` (
  `permission` int(11) NOT NULL,
  `id_role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Privilege`
--

CREATE TABLE `Privilege` (
  `privilege` int(11) NOT NULL,
  `id_compte` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Role`
--

CREATE TABLE `Role` (
  `id` int(11) NOT NULL,
  `id_asso` int(11) NOT NULL,
  `titre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Type_missions_organisees`
--

CREATE TABLE `Type_missions_organisees` (
  `id_asso` int(11) NOT NULL,
  `type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `User`
--

CREATE TABLE `User` (
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `tel` varchar(50) NOT NULL,
  `date_naissance` date NOT NULL,
  `photo` varchar(250) NOT NULL COMMENT 'url de la photo',
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Association`
--
ALTER TABLE `Association`
  ADD PRIMARY KEY (`id_asso`),
  ADD KEY `Asso_compte` (`id_compte`);

--
-- Index pour la table `Benevole`
--
ALTER TABLE `Benevole`
  ADD PRIMARY KEY (`id_benevole`),
  ADD KEY `Benevole_asso` (`id_asso`),
  ADD KEY `Benevole_user` (`id_user`);

--
-- Index pour la table `Compte`
--
ALTER TABLE `Compte`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Log`
--
ALTER TABLE `Log`
  ADD PRIMARY KEY (`id_log`),
  ADD KEY `Log_compte` (`id_compte`);

--
-- Index pour la table `Mission`
--
ALTER TABLE `Mission`
  ADD PRIMARY KEY (`id_mission`),
  ADD KEY `mission_asso` (`id_asso`);

--
-- Index pour la table `Organise`
--
ALTER TABLE `Organise`
  ADD PRIMARY KEY (`id_benevole`,`id_mission`),
  ADD KEY `Organise_mission` (`id_mission`);

--
-- Index pour la table `Participe`
--
ALTER TABLE `Participe`
  ADD PRIMARY KEY (`id_mission`,`id_user`),
  ADD KEY `Participe_user` (`id_user`);

--
-- Index pour la table `Permission`
--
ALTER TABLE `Permission`
  ADD PRIMARY KEY (`permission`,`id_role`),
  ADD KEY `Perm_role` (`id_role`);

--
-- Index pour la table `Privilege`
--
ALTER TABLE `Privilege`
  ADD PRIMARY KEY (`privilege`,`id_compte`),
  ADD KEY `Privilege_compte` (`id_compte`);

--
-- Index pour la table `Role`
--
ALTER TABLE `Role`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Role_asso` (`id_asso`);

--
-- Index pour la table `Type_missions_organisees`
--
ALTER TABLE `Type_missions_organisees`
  ADD PRIMARY KEY (`id_asso`,`type`);

--
-- Index pour la table `User`
--
ALTER TABLE `User`
  ADD KEY `user_compte` (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Association`
--
ALTER TABLE `Association`
  MODIFY `id_asso` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `Benevole`
--
ALTER TABLE `Benevole`
  MODIFY `id_benevole` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `Compte`
--
ALTER TABLE `Compte`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `Log`
--
ALTER TABLE `Log`
  MODIFY `id_log` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `Mission`
--
ALTER TABLE `Mission`
  MODIFY `id_mission` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `Role`
--
ALTER TABLE `Role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Association`
--
ALTER TABLE `Association`
  ADD CONSTRAINT `Asso_compte` FOREIGN KEY (`id_compte`) REFERENCES `Compte` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Benevole`
--
ALTER TABLE `Benevole`
  ADD CONSTRAINT `Benevole_asso` FOREIGN KEY (`id_asso`) REFERENCES `Association` (`id_asso`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Benevole_user` FOREIGN KEY (`id_user`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Log`
--
ALTER TABLE `Log`
  ADD CONSTRAINT `Log_compte` FOREIGN KEY (`id_compte`) REFERENCES `Compte` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Mission`
--
ALTER TABLE `Mission`
  ADD CONSTRAINT `mission_asso` FOREIGN KEY (`id_asso`) REFERENCES `Association` (`id_asso`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Organise`
--
ALTER TABLE `Organise`
  ADD CONSTRAINT `Organise_benevole` FOREIGN KEY (`id_benevole`) REFERENCES `Benevole` (`id_benevole`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Organise_mission` FOREIGN KEY (`id_mission`) REFERENCES `Mission` (`id_mission`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Participe`
--
ALTER TABLE `Participe`
  ADD CONSTRAINT `Participe_mission` FOREIGN KEY (`id_mission`) REFERENCES `Mission` (`id_mission`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Participe_user` FOREIGN KEY (`id_user`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Permission`
--
ALTER TABLE `Permission`
  ADD CONSTRAINT `Perm_role` FOREIGN KEY (`id_role`) REFERENCES `Role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Privilege`
--
ALTER TABLE `Privilege`
  ADD CONSTRAINT `Privilege_compte` FOREIGN KEY (`id_compte`) REFERENCES `Compte` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Role`
--
ALTER TABLE `Role`
  ADD CONSTRAINT `Role_asso` FOREIGN KEY (`id_asso`) REFERENCES `Association` (`id_asso`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Type_missions_organisees`
--
ALTER TABLE `Type_missions_organisees`
  ADD CONSTRAINT `Type_missions_organisees_asso` FOREIGN KEY (`id_asso`) REFERENCES `Association` (`id_asso`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `User`
--
ALTER TABLE `User`
  ADD CONSTRAINT `user_compte` FOREIGN KEY (`id`) REFERENCES `Compte` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
