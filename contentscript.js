//import java.util.regex.Matcher;
//import java.util.regex.Pattern;

//DEBUG:
//console.log ("TEST");

var regex = /art/;
var divText;
var loadOnce = 0;
var latestLink;
var codigoProcurado = "nothing";
//var storage = chrome.storage.local;

//var regex2 = /artigo/;

// art(?. )

//Git working >> Rep: LExtension2015

function click(e)
{
    //alert(e.target.id);
    codigoProcurado = e.target.id;
    alert (codigoProcurado);
    /*
    chrome.storage.local.set({'value': theValue}, function() {
        // Notify that we saved.
        message('Settings saved');
    });
    */
    window.close();
}
document.addEventListener('DOMContentLoaded', function () {
    var divs = document.querySelectorAll('div');
    for (var i = 0; i < divs.length; i++) {
        divs[i].addEventListener('click', click);
    }
});

$(document).ready(function(){
if (regex.test(document.body.innerText))
{

    chrome.storage.local.set({'codigo': codigoProcurado}, function() {
        // Notify that we saved.
        //alert('Settings saved');
    });
    /*
    var myTestVar = 'myVariableKeyName';
    configSalva.set(myTestVar);
    configSalva.get(myTestVar,function(result){
        console.log(myTestVar,result);
        //console output = myVariableKeyName {myTestVar:'my test var'}
    });
    */

    //alert(codigoProcurado);
	//alert(":: DEBUG :: teste de linha 0.2.36");

	// OLD CODE padraoProcurado = new RegExp ("(?:art.{0,7}\\.|artigo).{0,7}\\d{1,4}", "gi");

	//padraoProcurado = new RegExp ("(artigo)\\.\\d{1,4})", "gi");
	padraoProcurado = new RegExp ("(artigo|art)(\\D{0,2})(\\d{1,3})", "gi"); // (palavra "artigo" OU "art", case independente) \\D = qualquer nao digito, (\\d{1,4}) = qualquer digito de no maximo 4 algarismos
    padraoNumerico = new RegExp ("(\\d{1,3})", "gi");
    //var padraoProcuradoDiv="(?!(?:[^<]+>|[^>]+<\/a>))\b(" + value + ")\b";


    //var padraoProcuradoDivString = "(Art\. \\b(" + latestLink + ")\\b(.|\n.)+)";

    //var regex="(?!(?:[^<]+>|[^>]+<\/a>))\b(" + value + ")\b";
    //new RegExp(regex, "is")

    //padraoProcuradoDiv = new RegExp ("(Art\. \\b(" + latestLink + ")\\b(.|\n.)+)", "g"); //SHOULD BE: (Art\. 216(.|\n.)+) {216 = THE NUMBER NEEDED}
    //padraoLinks = new RegExp ("a");
    padraoLinks = new RegExp ("(art)(\\d{1,3})");

	// WORKING CODE document.body.innerHTML = document.body.innerHTML.replace(padraoProcurado, "ARTIGO ENCONTRADO 4"); //(("\\. ") || ("igo")) //("art\\.")|("artigo")

	//  //-----------TEST CODE--------//  //
	var nameMatches = [];
	var numberMatches = [];

	var paginaTexto = document.body.innerHTML;
	// TEST CODE var paginaTexto = "teste teste artigo 1234, art. 321 e art 321 teste";

    //BACKUP WORKING CODE: document.body.innerHTML = paginaTexto.replace(padraoProcurado, "<a href='https://www.google.com/#q=artigo+$3'>$1$2$3</a>");

    //linkify:

    document.body.innerHTML = paginaTexto.replace(padraoProcurado,
    function (match, p1, p2, p3)
    {
        //alert (p1);
        //return (p1 + p2 + p3);
        var linkA = ("http://www.planalto.gov.br/ccivil_03/Leis/2002/L10406.htm#art" + p3)
        return ("<a class='popuptest' href="+linkA+" style='color: #1599cb; text-decoration:underline' onclick=\"javascript:void window.open('http://www.planalto.gov.br/ccivil_03/Leis/2002/L10406.htm','1395670376154','width=650,height=750,toolbar=0,menubar=0,location=1,status=0,scrollbars=1,resizable=0,left=0,top=0');return false;\">"+p1+p2+p3+"</a>");
    });

    var links = document.getElementsByClassName("popuptest");
    for (i = 0; i < links.length; i++)
    {
        links[i].addEventListener('mouseover',getLink,false)
    }

    /*
     <a href=\"http://www.planalto.gov.br/ccivil_03/Leis/2002/L10406.htm\" onclick=\"javascript:void window.open('http://www.planalto.gov.br/ccivil_03/Leis/2002/L10406.htm','1395670376154','width=700,height=500,toolbar=0,menubar=0,location=0,status=0,scrollbars=1,resizable=0,left=0,top=0');return false;\">Pop-up Window</a>

    ------------------------------------------------------------------------
     <script>
     $(document).ready(function()
     {
     $("a").click(function(event)
        {
     event.preventDefault();
     });
     });
     </script>

     $('a').live('mousedown', function()
            {
     alert($(this).attr('href'));
     )      };
     */
    /*
     WORKING "<script>$('popup').click(function(e) {e.preventDefault();" +
     "alert(\"TEST\"); });</script>");

     $('popup').click(function(e) {e.preventDefault(); alert("CLICK")});
     */
    /*
     $('.update-cart').click(function(e) {
     e.stopPropagation();
     updateCartWidget();
     });
     */
    //$1 = art ou artigo, $2 = pontuacao ou espacos, $3 = numero do artigo

	//DEBUG:
	//alert(numberMatches);
	//alert(paginaTexto);

	// OLD CODE document.body.innerHTML = document.body.innerHTML.replace(padraoProcurado, "ARTIGO ENCONTRADO"); //(("\\. ") || ("igo")) //("art\\.")|("artigo")
	//document.body.innerHTML = document.body.innerHTML.replace(padraoProcurado, "ARTIGO ENCONTRADO");

	//  //-----------TEST CODE 2--------//  //
    // Add bubble to the top of the page.
    var bubbleDOM = document.createElement('div');
    bubbleDOM.setAttribute('class', 'selection_bubble');
    document.body.appendChild(bubbleDOM);

// Lets listen to mouseup DOM events.
    document.addEventListener('mouseup', function (e) {
        var selection = window.getSelection().toString();
        if (selection.length > 0) {
            renderBubble(e.clientX, e.clientY, selection);
        }
    }, false);


// Close the bubble when we click on the screen.
    document.addEventListener('mousedown', function (e) {
        bubbleDOM.style.visibility = 'hidden';
    }, false);

// Move that bubble to the appropriate location.
    function renderBubble(mouseX, mouseY, selection) {
        if (padraoProcurado.test(selection))
        {
            //ARTICLE NUMBER: alert(selection.match(padraoNumerico));
            bubbleDOM.innerHTML = selection;
            bubbleDOM.style.top = mouseY + 'px';
            bubbleDOM.style.left = mouseX + 'px';
            bubbleDOM.style.visibility = 'visible';
        }
        else
        {
            //alert(selection);
        }
    }
    //  //-----------TEST CODE 2--------//  //
	//var QUERY = 'art n'; Create a new querry to search on the target website

    /// TEST CODE 3 ///
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    document.documentElement.style.width = '100%';
    document.body.style.width = '100%';

    var div = document.createElement( 'div' );
    var btnForm = document.createElement( 'form' );
    var btn = document.createElement( 'input' );

//append all elements
    document.body.appendChild( div );

    /*
    div.appendChild( btnForm );
    btnForm.appendChild( btn );
     */

//set attributes for div
    div.id = 'myDivId';
    div.style.position = 'fixed';
    div.style.top = '82%';
    div.style.left = '30%';
    div.style.width = 150;
    div.style.height = '18%';
    div.style.backgroundColor = 'lightBlue';



//set attributes for btnForm
    //btnForm.action = '';

//set attributes for btn
//"btn.removeAttribute( 'style' );
    /*
    btn.type = 'button';
    btn.value = 'Carregando';
    btn.style.position = 'absolute';
    btn.style.top = '50%';
    btn.style.left = '50%';
    */

    // TEST CODE 05/10/2014
    /*
    $.ajax({
        url: 'http://www.planalto.gov.br/ccivil_03/Leis/2002/L10406.htm',
        type: 'GET',
        success: function(res) {
            var content = $(res.responseText);
            //artigosPage = content.document.body.innerHTML;
            //artigosPage.scrollTo("Art. 157")
        }
    });
    */

    if (loadOnce == 0)
    {
        $("#myDivId").load("http://www.planalto.gov.br/ccivil_03/Leis/2002/L10406.htm");
        //divText = div.body.innerHTML;
        loadOnce = 1;
        //alert ("entered here");
    }

    function getLink() {
        //alert(this.href);
        latestLink = padraoLinks.exec(this.href)[2];
        //alert(latestLink);
    }



    $("#myDivId").hide();
	///Mouse enter Test:
                    //$(document).ready(function () { /*Unnecessary?*/
        $(document).on('mouseenter', '.popuptest', function () {


            //$('#myDivId').load('http://www.planalto.gov.br/ccivil_03/Leis/2002/L10406.htm' + ' #art50[role="main"]');
            //$('#myDivId').load('http://www.planalto.gov.br/ccivil_03/Leis/2002/L10406.htm' + ' #art50[role="main"]');

            //var thestr = $.get("https://www.google.com/", String);

            //$('#myDivId').append('<span class="selected">Have some text</span>');

            //$("#myDivId").append($("<div>").load('http://www.planalto.gov.br/ccivil_03/Leis/2002/L10406.htm#art50'));



            //$( "#myDivId").replace(padraoProcurado,"AAAAAAAA");

            divText = div.innerText;
            //divText = divText.replace(padraoProcuradoDiv, "AAAAAAAAAAAAA");
            var theMatch = null;

            //alert (latestLink);
            //alert(latestLink);
            var padraoProcuradoDivString = "(Art\. \\b(" + latestLink + ")\\b(.|\n|\n\\d)+)";
            padraoProcuradoDiv = new RegExp (padraoProcuradoDivString, "g");

            var theMatch = padraoProcuradoDiv.exec(divText); //latestLink
            //alert(theMatch);
            div.innerText = theMatch[0];
                // /(?:^|\s)format_(.*?)(?:\s|$)/.exec(myString);

            $("#myDivId").show();

            //alert (divText);
            //$( "#myDivId" ).scrollTo("Art. 157");
            //div.style.top = e.clientY  + "px";
            //div.style.left = e.clientX  + "px";

        }).on('mouseleave', '.popuptest', function ()
            {

            $("#myDivId").hide();
            $("#myDivId").load("http://www.planalto.gov.br/ccivil_03/Leis/2002/L10406.htm");

            $('span', '#myDivId').empty().remove();
                //alert($(this));
                //alert(artigosPage);
            });
                    //});

//if (regex.test(document.body.innerText))
//{
	//document.body.innerHTML = document.body.innerHTML.replace(new RegExp("\\d\\d", "gi"), "XX"); //document.body.innerText
	//document.body.innerHTML = document.body.innerHTML.replace(new RegExp( "artigo \\d\\d\\d" , "gi"), "O ARTIGO");
	//document.body.innerHTML.replace(new RegExp("uno", "g"), "dos");
	// The regular expression produced a match, so notify the background page.
	chrome.extension.sendMessage({}, function(response) {});
} else
{
	// No match was found.
}});
