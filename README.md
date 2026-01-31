# Webtech Projekt

## DB aufsetzen:
- in phpmyAdmin die DB "straftaten_opfer" anlegen
- mit dem folgenden Befehl die Tabelle erstellen:
```sql
CREATE TABLE `pks_daten` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `jahr` INT(4),
  `straftat` VARCHAR(255),
  `ags` VARCHAR(5),
  `ort` VARCHAR(255),
  `opfer_insgesamt` INT,
  `opfer_m` INT,
  `opfer_w` INT,
  `kinder_u6_insg` INT,
  `kinder_u6_m` INT,
  `kinder_u6_w` INT,
  `kinder_6_14_insg` INT,
  `kinder_6_14_m` INT,
  `kinder_6_14_w` INT,
  `kinder_u14_insg` INT,
  `kinder_u14_m` INT,
  `kinder_u14_w` INT,
  `jugendliche_14_18_insg` INT,
  `jugendliche_14_18_m` INT,
  `jugendliche_14_18_w` INT,
  `heranwachsende_18_21_insg` INT,
  `heranwachsende_18_21_m` INT,
  `heranwachsende_18_21_w` INT,
  `erwachsene_21_60_insg` INT,
  `erwachsene_21_60_m` INT,
  `erwachsene_21_60_w` INT,
  `erwachsene_60_plus_insg` INT,
  `erwachsene_60_plus_m` INT,
  `erwachsene_60_plus_w` INT,
  `erwachsene_insg` INT,
  `erwachsene_m` INT,
  `erwachsene_w` INT,
  INDEX (`ags`), 
  INDEX (`straftat`),
  INDEX (`jahr`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```
- dann index.php in index_.php umbenennen, um auf import.php (in db) zugreifen zu können
- import.php im localhost ausführen (es sollten 2400 Zeilen importiert werden)
- in import.php $year und $filename auf 2023 bzw 2024 ändern
- nochmal import.php im localhost ausführen, um beide Jahre zu haben
- index_.php wieder in index.php umbenennen

