"use strict"

let USERID=2;
let LISTNAME="lotr"
let USERNAME="Bilbo"

function showUsername(){
    let insert=document.createElement("p");
    insert.innerHTML=USERNAME;
    document.getElementById("username").append(insert);
}

function changeList(name){
    LISTNAME=name;
    console.log(LISTNAME)
    loadCurrentList();
}




function getAllItems(){
    let data="";
    let requestURL = 'http://localhost:8181/api/v1/items';
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json'
    request.send(2);
    request.onload= function(){
        data=request.response
    }
}

function loadListNames(){
    let listNames="";
    let requestURL='http://localhost:8181/api/v1/listNames?userID='+USERID;
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json'
    request.setRequestHeader("content-Type","application/json");
    request.send();
    request.onload=function(){
        listNames=request.response;
        showListNames(listNames);
    }
}

function showListNames(listNames){
    for( let listName of listNames){
        let name=document.createElement("button")
        name.setAttribute("onclick","changeList('"+listName+"')");
        name.innerHTML=listName;
        document.getElementById("lists").append(name);
    }
    
    
}

function loadCurrentList(){

    let listItems="";
    let requestURL='http://localhost:8181/api/v1/listItems?listName='+LISTNAME+'&userID='+USERID;

    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json'
    request.setRequestHeader("content-Type","application/json");
    request.send();
    request.onload=function(){
        listItems=request.response;
        showCurrentList(listItems);
    }
}

function showCurrentList(listItems){
    for(let item of listItems){
        let row=document.createElement("tr");
        let desc=document.createElement("td");
        let compleated=document.createElement("td");
        let done=document.createElement("td");
        let del=document.createElement("td");
        let doneButton=document.createElement("button");
        let delButton=document.createElement("button");

        row.setAttribute("class","listItem")

        desc.innerHTML=item.desc;
        compleated.innerHTML=item.completed;

        doneButton.setAttribute("onclick","complete("+item.itemID+")")
        doneButton.innerHTML="Done";
        done.append(doneButton);
        delButton.setAttribute("onclick","remove("+item.itemID+"")
        delButton.innerHTML="Delete";
        del.append(delButton);
        row.append(desc)
        row.append(compleated)
        row.append(done);
        row.append(del);
        document.getElementById("currentList").append(row);

        console.log(row);
    }

}



loadListNames();

loadCurrentList();

showUsername();