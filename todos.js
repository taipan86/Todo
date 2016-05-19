var inpArr = [];
	var n = 0;
	var x = 0;
	
	var butChk = document.createElement("button");
	    butChk.id = "buttonCheck";
		butChk.className = "buttonChk";
	    butChk.innerHTML = "\u02C5";
		butChk.style.display = "none";
		
	document.getElementById("inputinitial").appendChild(butChk);
	
	var butAll = document.createElement("button");
	    butAll.id = "buttonAll";
		butAll.class = "controlbut";
		butAll.innerHTML = "All";
		
	var butAct = document.createElement("button");
	    butAct.id = "buttonActive";
		butAct.class = "controlbut";
		butAct.innerHTML = "Active";
		
	var butComp = document.createElement("button");
	    butComp.id = "buttonCompleted";
		butComp.class = "controlbut";
	    butComp.innerHTML = "Completed";
		
	var butClr = document.createElement("button");
	    butClr.id = "buttonClear";
		butClr.class = "controlbut";
	    butClr.innerHTML = "Clear completed";
		butClr.style.display = "none";


function addInArray (valoare) {
    var inp1 = obiectNou(valoare);
	inpArr.push(inp1);
	x++;
	showButChk ();
	overall ();
};

function obj(done, div1, div2, but, but1) {

	this.done = done;
	this.div1 = div1;
	this.div2 = div2;
	this.but = but;
	this.but1 = but1;
};

function obiectNou (valoare) {
    var inp = new obj();
	
	inp.done = false;
	
	inp.div1 = document.createElement("div");
		inp.div1.id = "divinp"+n;
		inp.div1.className = "divinput";
		    
	inp.div2 = document.createElement("div");
		inp.div2.id = "divinpt"+n;
		inp.div2.className = "divinput2";
	    inp.div2.innerHTML = valoare;
	
	inp.but = document.createElement("button");
	    inp.but.id = "delbut"+n;
	    inp.but.className = "btn";
		inp.but.innerHTML = "\u2716";
	
	inp.but1 = document.createElement("input");
	    inp.but1.id = "chbx"+n;
		inp.but1.type = "checkbox";
	    inp.but1.className = "checkbx";
	
	
	document.body.insertBefore(inp.div1, document.getElementById("numbact"));
	inp.div1.appendChild(inp.but1);
	inp.div1.appendChild(inp.div2);
	inp.div1.appendChild(inp.but);
	
	document.getElementById("divinpt"+n).addEventListener(
	"dblclick", function ()
	    {
		    this.contentEditable = true;
			this.focus();
			this.addEventListener("keypress", function (e) {
				if (e.keyCode === 13) {
				    this.contentEditable = false;
				};
			});
	    });
		
	document.getElementById("chbx"+n).addEventListener("change", 
	function ()
	    {
		    if (this.checked) {
			    document.getElementById("divinp"+this.id.replace(
				"chbx","")).style.textDecoration = "line-through";
				inp.done = true;
				x--;
				overall ();
			}
			else {
			    document.getElementById("divinp"+this.id.replace(
				"chbx","")).style.textDecoration = "none";
			    inp.done = false;
				x++;
				overall ();
			};
        showButClr ();			
		}
	);
	
	document.getElementById("delbut"+n).addEventListener("click", function ()
	    {
		    if (document.getElementById("chbx"+this.id.replace(
			"delbut","")).checked === false) {
			    x--;
			};
			
			document.body.removeChild(document.getElementById(
		    "divinp"+this.id.replace("delbut","")));
			
			for (i=0; i < inpArr.length; i++) {
			    if (inpArr[i].div1.id.replace("divinp","") === 
				this.id.replace("delbut","")) {
				var indextodel = i;
				break;
				};
			};
			inpArr.splice(indextodel,1);
			showButChk ();
			overall ();
		});
	
	document.getElementsByName("txt")[0].value="";
	n++;
	return inp;
};

function showButChk () {
    if (inpArr.length === 0) {
	    butChk.style.display = "none";
		numbact.style.display = "none";
	}
	else {
	    butChk.style.display = "inline";
		numbact.style.display = "block";
	};
};

function showButClr () {
    for (i=0; i<inpArr.length; i++) {
	    if (inpArr[i].done) {
	        butClr.style.display = "inline";
	        break;
		}
		else {
		    butClr.style.display = "none";
		}
	};
};

function overall () {
    document.getElementById("numbact").innerHTML = x + " items left";
	
	numbact.appendChild(butAll);
    numbact.appendChild(butAct);
	numbact.appendChild(butComp);
	numbact.appendChild(butClr);
	
	document.getElementById("buttonAll").addEventListener("click", 
	function () {
	    for (i=0; i<inpArr.length; i++) {
		    inpArr[i].div1.style.display = "block";
			inpArr[i].but1.style.display = "block";
	    }
	});
	
    document.getElementById("buttonActive").addEventListener("click", 
	function () {
	    for (i=0; i<inpArr.length; i++) {
		    if (inpArr[i].done) {
		        inpArr[i].div1.style.display = "none";
				inpArr[i].but1.style.display = "none";
			}
			else {
			inpArr[i].div1.style.display = "block";
			inpArr[i].but1.style.display = "block";
			};
		};
	});
	
	document.getElementById("buttonCompleted").addEventListener("click", 
	function () {
	    for (i=0; i<inpArr.length; i++) {
		    if (inpArr[i].done) {
		        inpArr[i].div1.style.display = "block";
				inpArr[i].but1.style.display = "block";
			}
			else {
			inpArr[i].div1.style.display = "none";
			inpArr[i].but1.style.display = "none";
			};
		};
	});
	
	document.getElementById("buttonClear").addEventListener("click", 
	function () {
	     for (i=0; i<inpArr.length; i++) {
		    if (inpArr[i].done) {
			document.body.removeChild(inpArr[i].div1);
			inpArr.splice(i,1);
			};
		};
		 butClr.style.display = "none";
		 showButChk ();
	});
};

document.getElementById("buttonCheck").addEventListener("click", 
    function () {
	    var chkchk = false;
	    for (i=0; i<inpArr.length; i++) {
	        if (inpArr[i].done === false) {
			    chkchk = true;
			}
		};
		
		if (chkchk) {
		    x=0;
			butClr.style.display = "inline";
		    for (j=0; j<inpArr.length; j++) {
				inpArr[j].done = true;
				inpArr[j].but1.checked = true;
				inpArr[j].div1.style.textDecoration = "line-through";
	        };			
		}
		else {
		    x=inpArr.length;
			butClr.style.display = "none";
		    for (j=0; j<inpArr.length; j++) {
				inpArr[j].done = false;
				inpArr[j].but1.checked = false;
				inpArr[j].div1.style.textDecoration = "none";
			};
		};
		overall ();
	});
