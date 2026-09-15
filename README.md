# DT207G Moment 2 - REST API

Detta är en REST-webbtjänst byggd med **Node.js**, **Express** och **MySQL** (via MAMP). API:et är byggt för att hantera arbetserfarenheter (work experience) med grundläggande CRUD-funktionalitet (Create, Read, Update, Delete).

## Länk

[http://localhost:3000/workexperience](http://localhost:3000/workexperience)

## Installation & Databas

- Klona repo: **git clone https://github.com/umavanmoriel/Moment2.1_DT207G.git**
- Installera nödvändiga npm-paket: **npm install**
- Starta MAMP och MySQL
- Öppna MAMP
- Klicka på **Start Servers**
- Kontrollera att MySQL körs på port 8889
- Kör installationsskriptet för att skapa databas och tabell: **node install.js**
- Starta servern: **node server.js**
- Gå till **http://localhost:3000**

## Databasstruktur

Installationsskriptet skapar en databas `DT207G_Moment2` med tabellen **workexperience** enligt nedanstående struktur:

| Tabell-namn | Fält | Typ | Beskrivning |
|-------------|------|-----|-------------|
| workexperience | id | INT | PRIMARY KEY, AUTO_INCREMENT |
| workexperience | companyname | varchar(100) | NOT NULL |
| workexperience | jobtitle | varchar(100) | NOT NULL |
| workexperience | location | varchar(100) | NOT NULL |
| workexperience | startdate | DATE | NOT NULL |
| workexperience | enddate | DATE | NOT NULL |
| workexperience | description | TEXT | NOT NULL |

## Användning

| Metod | Ändpunkt | Beskrivning |
|-------|----------|-------------|
| GET | /workexperience | Hämtar alla arbetserfarenheter |
| GET | /workexperience/:id | Hämtar en specifik arbetserfarenhet med angivet ID |
| POST | /workexperience | Lagrar en ny arbetserfarenhet. Kräver att ett objekt skickas med |
| PUT | /workexperience/:id | Uppdaterar en existerande arbetserfarenhet med angivet ID. Kräver att ett objekt skickas med |
| DELETE | /workexperience/:id | Raderar en arbetserfarenhet med angivet ID |

Ett arbetserfarenhet-objekt returneras/skickas som JSON med följande struktur:

```json
{
   "id": 1,
   "companyname": "Mittuniversitetet",
   "jobtitle": "Labbhandledare",
   "location": "Sundsvall",
   "startdate": "2019-01-01",
   "enddate": "2019-12-31",
   "description": "Handledning av studenter i kursen DT057G"
}