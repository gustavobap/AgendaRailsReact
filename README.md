# Invoices

This is an application for managing invoices. It comprises of two separate apps, a backend built with **Ruby on Rails** and a frontend built with **React**.

## Demo

There is a demonstration deployed at http://54.232.96.60/

## Installation

This project uses **docker** and **docker-compose** to build all infrastructure. You will need both installed.

First configure ports in **.env** file, located in ./docker folder. Default values are shown bellow.

```bash
CLIENT_IP=localhost
CLIENT_PORT=80
SERVER_IP=localhost
API_PORT=3010
```

Then build infrastructure and apps with the provided script 

```bash
./scripts/prod/install.sh
```

It will take some time for all the building to finish. After it's done you can access the app at the configured URL. 

eg. http://localhost 

You can remove docker images and containers running following script

```bash
./scripts/prod/uninstall.sh
```

## To do

* Mark as Paid
* Fields presence validators in InvoiceForm
* Delete modal
* Filter by status
* Date picker
* Drop down
* Write tests

## License
GNU General Public License v3.0
