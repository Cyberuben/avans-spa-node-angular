# avans-spa-node-angular
Single-page web application for Avans Informatica using Node.js and Angular 5

# Installatie

1. Voer `npm install` uit in de map van het project. Dit zal automatisch alle Angular dependencies en Node.js dependencies installeren.
2. Maak een `.env` bestand aan in deze map, met daarin de volgende info:
	```
	MONGODB_URI=mongodb://
	GRAPHENEDB_BOLT_PASSWORD=
	GRAPHENEDB_BOLT_URL=
	GRAPHENEDB_BOLT_USER=
	GRAPHENEDB_URL=
	PORT=
	```
3. `PORT` is de poort waar de Node.js API en statische bestanden mee worden geladen. Dit is dus (bijvoorbeeld) `4200`, dan is de website te benaderen op `http://localhost:4200`
4. Pas in `frontend/src/environments/environments.ts` de `apiUrl` aan naar `http://localhost:<PORT>/api`, waarbij `<PORT>` vervangen moet worden met de zelfde `PORT` als in het bestand `.env`
5. Run `npm run start` en de API zou moeten werken

# Voorbeelddata

Er is geen voorbeelddata bij dit project inbegrepen. De relaties werken als volgt:

- Er moeten eerst vaardigheden worden toegevoegd (typen, blind typen, hoofdrekenen)
- Vaardigheden worden toegevoegd aan een diploma
- Diploma's worden toegevoegd aan een persoon (met een datum "behaald op")