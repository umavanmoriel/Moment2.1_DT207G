# DT207G Moment 2 - REST API

Detta är en REST-webbtjänst byggd med **Node.js**, **Express** och **MySQL** (via MAMP). APIet är byggt för att hantera anställda (employees) med grundläggande CRUD-funktionalitet (Create, Read, Update, Delete).

## Länk

(Localhost:3000)[http://localhost:3000/employees]

## Installation & Databas

-- Klona repo **git clone https://github.com/umavanmoriel/Moment2.1_DT207G.git**
-- Installera nödvändiga npm-paket **npm install**
-- Starta MAMP och MySQL
-- Öppna MAMP
-- Klicka på Start Servers
-- Kontrollera att MySQL körs på port 8889
-- Kör installations skriptet för att skapa databas och tabell **node install.js**
-- Starta servern **node server.js**
-- Gå till **http://localhost:3000**


## Databasstruktur
Installations-skriptet skapar en databas DT207G_Moment2 med tabellen **employees** enligt nedanstående struktur:

| Tabell-namn | Fält | Typ | Beskrivning |
|-------------|------|-----|-------------|
| employees | id | int(11) | PRIMARY KEY, AUTO_INCREMENT |
| employees | name | varchar(100) | NOT NULL |
| employees | lastname | varchar(100) | NOT NULL |
| employees | jobtitle | varchar(100) | NOT NULL |
| employees | location | varchar(100) | NOT NULL |
| employees | dateofbirth | DATE | NOT NULL |

## Användning

| Metod | Ändpunkt | Beskrivning |
|-------|----------|-------------|
| GET | /employees | Hämtar alla anställda |
| POST | /employees | Lagrar en ny anställd. Kräver att ett anställd-objekt skickas med |
| PUT | /employees/:ID | Uppdaterar en existerande anställd med angivet ID. Kräver att ett anställd-objekt skickas med |
| DELETE | /employees/:ID | Raderar en anställd med angivet ID |

Ett anställd-objekt returneras/skickas som JSON med följande struktur:

```json
{
   "ID": 1,
   "Name": "Anna",
   "Lastname": "Svensson",
   "Jobtitle": "Utvecklare",
   "Location": "Stockholm",
   "Dateofbirth": "1990-01-01"
}
```


