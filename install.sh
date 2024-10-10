#! /bin/bash

echo "Welcome to Install Script"
echo "Choose what you want to install"


function installDev()
{
    echo "Install Dev Started"
    sleep 1

    yarn 

    sleep 3
    yarn dev --host --port 3000

    #docker-compose -f docker-compose_dev.yml down
    #docker-compose -f docker-compose_dev.yml build --no-cache
    #docker-compose -f docker-compose_dev.yml up

    #echo "Install Dev Finished"

    exit 0
}

function installProd()
{
    echo "Install Prod Started"
    sleep 1

    docker-compose down --rmi all
    docker-compose build --no-cache
    docker-compose up -d

    sleep 1
    echo "Install Prod Finished"

    echo "Containers up"
    docker-compose ps
    exit 0
}



select op in DEV PROD EXIT
do 
    case $op in 
        DEV)
            echo "DEV"
            installDev
        ;;

        PROD)
            echo "PROD"
            installProd
        ;;

        EXIT)
            echo "Terminated successfully"
            exit 0
        ;;

        *)
            echo "Error, unknown command";;
    
    esac
done


