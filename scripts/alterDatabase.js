var xmlResponse;

function ShowForm()
{
    var form = 
     `<div class='container'>
        <div class='row'>
		    <div class='well bs-component'>
                <form id='regForm' class='form-horizontal' method='POST'>
    			 	<div class='form-group row'>
				 		<label class='col-sm-2 col-form-label'>First Name</label>
				 		<div class='col-sm-10'>
				 			<input class='form-control' type='text' name='firstName' required>
                             <p class="bg-danger" style="font-size:18px;display:none;" id="errorFirstName"></p>
				 		</div>
				 	</div>		
                     <div class='form-group row'>
				 		<label class='col-sm-2 col-form-label'>Last Name</label>
				 		<div class='col-sm-10'>
				 			<input class='form-control' type='text' name='lastName' required>
                             <p class="bg-danger" style="font-size:18px;display:none;" id="errorLastName"></p>
				 		</div>
				 	</div>	
                     <div class='form-group row'>
				 		<label class='col-sm-2 col-form-label'>Faculty Number</label>
				 		<div class='col-sm-10'>
				 			<input class='form-control' type='text' name='facultyID' required>
                             <p class="bg-danger" style="font-size:18px;display:none;" id="errorFacultyID"></p>
				 		</div>                        
				 	</div>
                     <div class='form-group row'>
				 		<label class='col-sm-2 col-form-label'>Mark of Computer Architecture</label>
				 		<div class='col-sm-10'>
				 			<select name='' id='markCASelect' class='form-control' id='sel1'>
                            <option value='1'>2</option>
                            <option value='2'>3</option>
                            <option value='3'>4</option>
                            <option value='4'>5</option>
                            <option value='5'>6</option>
                            </select>
				 		</div>
				 	</div>	
                     <div class='form-group row'>
				 		<label class='col-sm-2 col-form-label'>Mark of Software Technologies</label>
				 		<div class='col-sm-10'>
				 			<select name='' id='markSTSelect' class='form-control' id='sel1'>
                            <option value='1'>2</option>
                            <option value='2'>3</option>
                            <option value='3'>4</option>
                            <option value='4'>5</option>
                            <option value='5'>6</option>
                            </select>
				 		</div>
				 	</div>	
                     <div class='form-group row'>
				 		<label class='col-sm-2 col-form-label'>Mark of Databases</label>
				 		<div class='col-sm-10'>
				 			<select name='' id='markDBSelect' class='form-control' id='sel1'>
                            <option value='1'>2</option>
                            <option value='2'>3</option>
                            <option value='3'>4</option>
                            <option value='4'>5</option>
                            <option value='5'>6</option>
                            </select>
				 		</div>
				 	</div>	
                     <div class='form-group row'>
				 		<label class='col-sm-2 col-form-label'>Mark of Computer Graphics</label>
				 		<div class='col-sm-10'>
				 			<select name='' id='markCGSelect' class='form-control' id='sel1'>
                            <option value='1'>2</option>
                            <option value='2'>3</option>
                            <option value='3'>4</option>
                            <option value='4'>5</option>
                            <option value='5'>6</option>
                            </select>
				 		</div>
				 	</div>	
                     <div class='form-group row'>
				 		<label class='col-sm-2 col-form-label'>Mark of ComputerComunications</label>
				 		<div class='col-sm-10'>
				 			<select name='' id='markCCSelect' class='form-control' id='sel1'>
                            <option value='1'>2</option>
                            <option value='2'>3</option>
                            <option value='3'>4</option>
                            <option value='4'>5</option>
                            <option value='5'>6</option>
                            </select>
				 		</div>
				 	</div>
                     <div class='form-group row'>
				 		<div class='col-sm-9 col-sm-offset-2'>
				 			<button class='btn btn-default' type='reset'>Reset</button>
							<button onclick="ProcessStudentForm('${document.getElementById("mySelect").options[document.getElementById("mySelect").selectedIndex].value}')" type='button' class='col-md-offset-1 btn btn-primary' >Add</button>
				 		</div>
				 	</div>				  
				</form>
            </div>
        </div>
    </div>`;
    document.getElementById("output").innerHTML = form;
    
}

function ProcessStudentForm(chosenOption)
{
    ResetAllErrors();
    var studentData = GetInputFromForm();
    
    //Check input
    var firstNameRes = CheckName(studentData[0]);
    var lastNameRes = CheckName(studentData[1]);
    var facultyIdRes = CheckFNumChars(studentData[2]);
    console.log("Result of check is: " + firstNameRes);
    
    if(!firstNameRes)
    {
        DisplayFirstNameFormatError();
        return;
    }
    if(!lastNameRes)
    {
        DisplayLastNameFormatError();
        return;
    }
    if(!facultyIdRes)
    {
        DisplayFacultyIDFormatError();
        return;
    }

    if(chosenOption == 3)
    {
        var facultyIdExistError = CheckFNumExists(studentData[2]);
        if(facultyIdExistError)
        {
            DisplayFacultyIDExistsError();
            return;
        }

        AddStudentToXML(studentData);
        AddStudentToTable(studentData);
    }   
    else if(chosenOption == 4)
    {
        EditStudent(studentData);
    } 
}

function GetInputFromForm()
{
    var formInputs = document.getElementById('regForm');
    var inputData = new Array();
    for(var i = 0; i < formInputs.length; i++)
    {
        //console.log(formInputs[i].tagName);
        
        if(formInputs[i].type == "text")
        {
            //console.log("Found text input");
            inputData.push(formInputs[i].value);
        }
        else if(formInputs[i].tagName == "SELECT")
        {
            //console.log(formInputs[i].options[formInputs[i].selectedIndex].text);
            inputData.push(formInputs[i].options[formInputs[i].selectedIndex].text);
        }
    }
    //console.log(inputData);
    return inputData;
}

function AddStudentToXML(studentData)
{
    //xmlDoc=loadXMLDoc("StudentGroup.xml");
    console.log(xmlResponse)
    var newStudent = xmlResponse.createElement("student");
    
    var studentElementNodes = new Array();

    var studentNameNode = xmlResponse.createElement("name");
    var studentLastNameNode = xmlResponse.createElement("lastName");
    var studentFNumNode = xmlResponse.createElement("fNum");
    var studentMarkCA = xmlResponse.createElement("subjectMark");
    var studentMarkST = xmlResponse.createElement("subjectMark");
    var studentMarkDB = xmlResponse.createElement("subjectMark");
    var studentMarkCG = xmlResponse.createElement("subjectMark");
    var studentMarkCC = xmlResponse.createElement("subjectMark");

    studentElementNodes.push(studentNameNode);
    studentElementNodes.push(studentLastNameNode);
    studentElementNodes.push(studentFNumNode);
    studentElementNodes.push(studentMarkCA);
    studentElementNodes.push(studentMarkST);
    studentElementNodes.push(studentMarkDB);
    studentElementNodes.push(studentMarkCG);
    studentElementNodes.push(studentMarkCC);

    var markCAAtt = xmlResponse.createAttribute("name");
    markCAAtt.nodeValue = "ComputerArchitecture";
    studentMarkCA.setAttributeNode(markCAAtt);

    var markSTAtt = xmlResponse.createAttribute("name");
    markSTAtt.nodeValue = "SoftwareTechnologies";
    studentMarkST.setAttributeNode(markSTAtt);

    var markDBAtt = xmlResponse.createAttribute("name");
    markDBAtt.nodeValue = "Databases";
    studentMarkDB.setAttributeNode(markDBAtt);

    var markCGAtt = xmlResponse.createAttribute("name");
    markCGAtt.nodeValue = "ComputerGraphics";
    studentMarkCG.setAttributeNode(markCGAtt);

    var markCCAtt = xmlResponse.createAttribute("name");
    markCCAtt.nodeValue = "ComputerComunications";
    studentMarkCC.setAttributeNode(markCCAtt);


     for(var i=0; i< studentElementNodes.length; i++)
    {
        studentElementNodes[i].appendChild(xmlResponse.createTextNode(studentData[i]));
        newStudent.appendChild(studentElementNodes[i]);
    }

    xmlResponse.getElementsByTagName("studentGroup")[0].appendChild(newStudent);

    var xmlhttp;
    if(window.XMLHttpRequest)
    {
        xmlhttp = new XMLHttpRequest;
    }
    else
    {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function()
    {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            console.log(xmlhttp.responseText);
        }
    }    
    
    console.log(xmlhttp);
    UpdateXMLDatabase();
}

function UpdateXMLDatabase()
{
    var xmlString = new XMLSerializer().serializeToString(xmlResponse);
    //console.log(xmlString);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST","http://localhost/student_group/updateXML.php",true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send('xml=' + xmlString);

}

function AddStudentToTable(studentData)
{
    //create row tr with class student
    //create cells for name, lastName, FID and add to them textNodes
    //append td cells to tr row
    //foreach mark create:
    //  tr row with class mark, append to it td, to td append textNode and childElement mark with textNode - the mark itself
    //append 

    var table = document.getElementById("studentGroupTable");
    var newRow=table.insertRow(-1);
    newRow.className="student";
    newRow.setAttribute("id", studentData[2]);

    var nameCell=newRow.insertCell(-1);
    var nameText = studentData[0];
    var textNode = document.createTextNode(nameText);
    nameCell.appendChild(textNode);

    var lastNameCell=newRow.insertCell(-1);
    var lastNameText = studentData[1];
    var textNode = document.createTextNode(lastNameText);
    lastNameCell.appendChild(textNode);

    var fNumCell=newRow.insertCell(-1);
    var fNumText = studentData[2];
    var textNode = document.createTextNode(fNumText);
    fNumCell.appendChild(textNode);

    for(var i = 3; i < studentData.length; i++)
    {
        var markText=new Array();
        markText.push("Mark of Computer Architecture: ");
        markText.push("Mark of Software Technologies: ");
        markText.push("Mark of Databases: ");
        markText.push("Mark of Computer Graphics: ");
        markText.push("Mark of Computer Comunications: ");

        var markRow = table.insertRow(-1);
        markRow.className = "marks"; 

        var markCell = markRow.insertCell(-1);
        markCell.colSpan = "3";
        markCell.appendChild(document.createTextNode(markText[i-3]));
        markCell.setAttribute("name", "mark" + (i-3).toString());
        
        var markElement = document.createElement("mark");
        markElement.appendChild(document.createTextNode(studentData[i]));

        if(i == studentData.length - 1)
        {
            markRow.className +=" lastmark";
        }

        markCell.appendChild(markElement);
        markRow.appendChild(markCell);
    }
    document.getElementById("output").innerHTML="";
}

function EraseStudentByFNum(fNum)
{
    console.log(xmlResponse);
    var x = xmlResponse.getElementsByTagName("student");
    for (i = 0; i <x.length; i++) 
    { 
        if(fNum == x[i].getElementsByTagName("fNum")[0].childNodes[0].nodeValue)
        {
            var studentToErase = xmlResponse.getElementsByTagName("student")[i];
            xmlResponse.documentElement.removeChild(studentToErase);
            console.log(xmlResponse);
        }
    }
    RemoveStudentFromTable(fNum);

    UpdateXMLDatabase();    
}

function RemoveStudentFromTable(fNum)
{
     $(document).ready(function(){
       $("#" + fNum).nextUntil("tr.student").remove();
        $("#" + fNum).remove();
    });
   return false;
}


function EditStudent(studentData)
{
    //Edit XML
    //Edit Table
    //ShowFormForEdit(fNum);
    EditStudentInXML(studentData);
    EditStudentInTable(studentData);
    document.getElementById("output").innerHTML="";
}

function EditStudentInXML(studentData)
{
      console.log(xmlResponse);
    var students = xmlResponse.getElementsByTagName("student");
    var foundStudentData = new Array();
    for (i = 0; i <students.length; i++) 
    { 
        if(studentData[2] == students[i].getElementsByTagName("fNum")[0].childNodes[0].nodeValue)
        {

            for(var j=0; j< students[i].childNodes.length; j++)
            {

                if(students[i].childNodes[j].nodeType == 1)
                {
                    console.log(students[i].childNodes[j] + "Iterator " + j);
                    foundStudentData.push(students[i].childNodes[j]);
                }
                
            }
        }
    }

    for(dataElement in foundStudentData)
    {
        foundStudentData[dataElement].childNodes[0].nodeValue = studentData[dataElement];
    }
    console.log(xmlResponse);
    UpdateXMLDatabase();
}

function ShowFormForEdit(fNum)
{
    ShowForm();
    UpdateFormForChosenStudent(fNum);
}

function UpdateFormForChosenStudent(fNum)
{
    var fNameForm = document.getElementsByName("firstName")[0];
    var lNameForm = document.getElementsByName("lastName")[0];
    var fIDForm = document.getElementsByName("facultyID")[0];
    var markCASelect = document.getElementById("markCASelect");
    var markSTSelect = document.getElementById("markSTSelect");
    var markDBSelect = document.getElementById("markDBSelect");
    var markCGSelect = document.getElementById("markCGSelect");
    var markCCSelect = document.getElementById("markCCSelect");
    console.log(markCASelect);
    var studentData = GetStudentDataFromXMLByFNum(fNum);

    fNameForm.value = studentData[0];
    lNameForm.value = studentData[1];
    fIDForm.value = studentData[2];
    markCASelect.value = studentData[3]-1;
    markSTSelect.value = studentData[4]-1;
    markDBSelect.value = studentData[5]-1;
    markCGSelect.value = studentData[6]-1;
    markCCSelect.value = studentData[7]-1;

    fIDForm.disabled=true;
}

function GetStudentDataFromXMLByFNum(fNum)
{
    var studentData = new Array();
    var students = xmlResponse.getElementsByTagName("student");
    for (i = 0; i <students.length; i++) 
    { 
        if(fNum == students[i].getElementsByTagName("fNum")[0].childNodes[0].nodeValue)
        {
        //console.log("Student found...");
        var firstName = students[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
        var lastName = students[i].getElementsByTagName("lastName")[0].childNodes[0].nodeValue;
        var facultyId = students[i].getElementsByTagName("fNum")[0].childNodes[0].nodeValue;
        var marksArray = ExtractSubjectMarksFromNode(students[i].getElementsByTagName("subjectMark"));

        studentData.push(firstName);
        studentData.push(lastName);
        studentData.push(facultyId);
        for(mark in marksArray)
        {
            studentData.push(marksArray[mark]);
        }
        }
    }
    console.log(studentData);
    return studentData;
}

function EditStudentInTable(studentData)
{
    var studentHeaderRow = document.getElementById(studentData[2])
    console.log(studentHeaderRow.childNodes.length + "Has childs: "+studentHeaderRow.childElementCount);
    //console.log(studentHeaderRow.childNodes[5]);
    //studentHeaderRow.childNodes[1].innerHTML = studentData[0];
    //studentHeaderRow.childNodes[3].innerHTML = studentData[1];
    var tableHeader = new Array();//contains reference to first and last name columns

    for(var i=0; i< studentHeaderRow.childNodes.length; i++)
    {
        //console.log(studentHeaderRow.childNodes[i]);
        if(studentHeaderRow.childNodes[i].nodeType == 1)
        {
            //console.log(studentHeaderRow.childNodes[i]);
            tableHeader.push(studentHeaderRow.childNodes[i]);
            //studentHeaderRow.childNodes[i].innerHTML = studentData[i%3];
        }
    }
    tableHeader[0].innerHTML = studentData[0];
    tableHeader[1].innerHTML = studentData[1];
    var traverseRows = studentHeaderRow.nextSibling;
    
    try{
        while(traverseRows != null || !traverseRows.id )
        {
        if(traverseRows.nodeType == 1)
        {
            //console.log(traverseRows.nodeType + " " + traverseRows.innerHTML);
            //console.log(traverseRows.childNodes[0].getAttribute("name"));
            switch(traverseRows.childNodes[0].getAttribute("name"))
            {
                case "mark0":
                   // console.log(traverseRows.childNodes[0].childNodes[1].innerHTML);
                    traverseRows.childNodes[0].childNodes[1].innerHTML = studentData[3];
                    break;
                case "mark1":
                    //console.log(traverseRows.childNodes[0].childNodes[1].innerHTML);
                    traverseRows.childNodes[0].childNodes[1].innerHTML = studentData[4];
                    break;
                case "mark2":
                    //console.log(traverseRows.childNodes[0].childNodes[1].innerHTML);
                    traverseRows.childNodes[0].childNodes[1].innerHTML = studentData[5];
                    break;
                case "mark3":
                    //console.log(traverseRows.childNodes[0].childNodes[1].innerHTML);
                    traverseRows.childNodes[0].childNodes[1].innerHTML = studentData[6];
                    break;
                case "mark4":
                    //console.log(traverseRows.childNodes[0].childNodes[1].innerHTML);
                    traverseRows.childNodes[0].childNodes[1].innerHTML = studentData[7];
                    break;
            }
            
        }
        traverseRows = traverseRows.nextSibling;  
        }
    }
    catch(err){
        console.log("element is null");
    }
    
}

function ResetAllErrors()
{
    document.getElementById("errorFirstName").style.display = "none";
    document.getElementById("errorLastName").style.display = "none";
    document.getElementById("errorFacultyID").style.display = "none";
}

function DisplayFirstNameFormatError()
{
    var displayErrorText = document.getElementById("errorFirstName");
    displayErrorText.innerHTML = "Name format must contain only letters and first letter to be uppercase!";
    displayErrorText.style.display = "initial";
}

function DisplayLastNameFormatError()
{
    var displayErrorText = document.getElementById("errorLastName");
    displayErrorText.innerHTML = "Name format must contain only letters and first letter to be uppercase!";
    displayErrorText.style.display = "initial";
}

function DisplayFacultyIDFormatError()
{
    var displayErrorText = document.getElementById("errorFacultyID");
    displayErrorText.innerHTML = "Faculty ID must contain only digits";
    displayErrorText.style.display = "initial";
}

function DisplayFacultyIDExistsError()
{
    var displayErrorText = document.getElementById("errorFacultyID");
    displayErrorText.innerHTML = "Student with this Faculty ID already exists!";
    displayErrorText.style.display = "initial";
}