function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      mainFunction(this);
    }
  };
  xhttp.open("GET", "StudentGroup.xml?qs=" + new Date().getTime(), true);
  xhttp.send();


}

function OutputAverageGradeOfStudent(xml, fNum)
{
  var i;
  var xmlDoc = xml.responseXML;
  var x = xmlDoc.getElementsByTagName("student");

  for (i = 0; i <x.length; i++) 
  { 
    if(fNum == x[i].getElementsByTagName("fNum")[0].childNodes[0].nodeValue)
    {
        console.log("Student found...");
        var firstName = x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
        var lastName = x[i].getElementsByTagName("lastName")[0].childNodes[0].nodeValue;
        var facultyId = x[i].getElementsByTagName("fNum")[0].childNodes[0].nodeValue;
        var marksArray = ExtractSubjectMarksFromNode(x[i].getElementsByTagName("subjectMark"));
        console.log(marksArray);
        var grade = CalculateAverageGrade(marksArray);
        var studentData = new Array();
        studentData.push("Name: " + firstName + " " + lastName);
        studentData.push("Faculty ID: " + facultyId);
        studentData.push("Average Grade: " + grade);
        OutputStudent(document.getElementById("output"), studentData, true);
    }       
  }
}

function ExtractSubjectMarksFromNode(nodes)//takes for parameter found elements by tag name, returns array containing each mark of student
{
    var marksArray = new Array();
    //console.log(nodes);
    for(var i = 0; i < nodes.length; i++)
    {
        console.log(nodes[i]);
        switch(nodes[i].getAttribute("name"))
        {
            case "ComputerArchitecture":
                marksArray.push(parseInt(nodes[i].childNodes[0].nodeValue));
                //console.log("CA: " + nodes[i].childNodes[0].nodeValue);
                break;
            case "SoftwareTechnologies":
                marksArray.push(parseInt(nodes[i].childNodes[0].nodeValue));
                //console.log("ST: " + nodes[i].childNodes[0].nodeValue);
                break;
            case "Databases":
                marksArray.push(parseInt(nodes[i].childNodes[0].nodeValue));
                //console.log("DB: " + nodes[i].childNodes[0].nodeValue);
                break;
            case "ComputerGraphics":
                marksArray.push(parseInt(nodes[i].childNodes[0].nodeValue));
                //console.log("CG: " + nodes[i].childNodes[0].nodeValue);
                break;
            case "ComputerComunications":
                marksArray.push(parseInt(nodes[i].childNodes[0].nodeValue));
               // console.log("CC: " + nodes[i].childNodes[0].nodeValue);
                break;    
        }  
    }   
    return marksArray;
}

function CalculateAverageGrade(marks)
{
    var grade = 0;
    for(var i = 0; i < marks.length; i++)
    {
        grade += marks[i];
    }
    grade /= marks.length;
    return grade;
}

function OutputStudent(parentToAppend, studentData, clearparent)
{
    //create outer div, add to it class panel panel-default
    //create inner div, add to it class panel-body, append to outerDiv
    //create textNode 
    //append textNode to inner div
    var panelDiv = document.createElement("div");
    panelDiv.className += "panel panel-default";

    var bodyPanelDiv = document.createElement("div");
    bodyPanelDiv.className += "panel-body";
    panelDiv.appendChild(bodyPanelDiv);

    for(var i = 0; i < studentData.length; i++)
    {
        bodyPanelDiv.appendChild(document.createTextNode(studentData[i]));       
        bodyPanelDiv.appendChild(document.createElement("br")); 
    }
    
    //console.log(panelDiv);
    if(clearparent)
    {
        parentToAppend.innerHTML ="";
    }

    parentToAppend.appendChild(panelDiv);
}

function ConstructStudentArray(xml)//creates array of student objects that holds average grade of each student
{
  var i;
  var studentsArray = new Array();
  var xmlDoc = xml.responseXML;
  var x = xmlDoc.getElementsByTagName("student");

  for(i = 0; i < x.length; i++)
  {
    var firstName = x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
    var lastName = x[i].getElementsByTagName("lastName")[0].childNodes[0].nodeValue;
    var facultyId = x[i].getElementsByTagName("fNum")[0].childNodes[0].nodeValue;
    var marksArray = ExtractSubjectMarksFromNode(x[i].getElementsByTagName("subjectMark"));
    var grade = CalculateAverageGrade(marksArray);
    var studentObject = {firstName: firstName, lastName: lastName, facultyId: facultyId, grade: grade};
    studentsArray.push(studentObject);
  }
  //console.log(studentsArray);
  return studentsArray;
}

function CalculateTotalAverageGrade(xml, studentsArray)//creates array of average grade for each student based on the ConstructStudentArray() return, and calculates the average of those grades
{
    //var studentsArray = ConstructStudentArray(xml);
    var marksArray = new Array();
    
    for(student in studentsArray)
    {
        //console.log("Average grade " + studentsArray[student].grade);
        marksArray.push(studentsArray[student].grade);
    }
    var totalGrade = CalculateAverageGrade(marksArray);
    totalGrade = round(totalGrade,1);
    //console.log("TOTAL GRADE: " + totalGrade);
    return totalGrade;
}

function OutputStudentPanel(studentsArray, totalGrade)//creates bootstrap panel that students with lower grade are appended to
{
    document.getElementById("output").innerHTML = "";
    var panelHeader = document.createElement("h2");
    panelHeader.appendChild(document.createTextNode("Students that has grade less than " + totalGrade));
    //console.log(panelHeader);

    var panelDiv = document.createElement("div");
    panelDiv.className += "panel-group";
    //console.log(panelDiv);

    for(var i = 0; i < studentsArray.length; i++)
    {
       console.log("OBJECT: "+ studentsArray[i]); 
       OutputStudent(panelDiv, studentsArray[i], false);
    }
    //console.log(panelDiv);
    document.getElementById("output").appendChild(panelHeader);
    document.getElementById("output").appendChild(panelDiv);
}

function GetStudentsWithLowerGrade(xml)
{
    var studentsArray = ConstructStudentArray(xml);
    var totalGrade = CalculateTotalAverageGrade(xml, studentsArray);
    var lowGradeStudents = new Array();
    for(student in studentsArray)
    {
        if(studentsArray[student].grade < totalGrade)
        {
            //output that student
            var studentData = new Array();
            studentData.push("Name: "+studentsArray[student].firstName + " " + studentsArray[student].lastName);
            studentData.push("Faculty ID: " + studentsArray[student].facultyId);
            studentData.push("Average Grade: " + studentsArray[student].grade);
            lowGradeStudents.push(studentData);
            //
        }
    }
    OutputStudentPanel(lowGradeStudents, totalGrade);
    //console.log(lowGradeStudents);
}

function mainFunction(xml) {
            document.getElementById("errorText").style.display = "none";

            var opt = GetValueFromSelect()// get value from select options
            var inputText=document.getElementById("myInput");
            var inputFNum = inputText.value;

            xmlResponse=xml.responseXML;

         
            if(!inputText.disabled)
            {
                var isLetters = CheckFNumChars(inputFNum);
                var doesExists = CheckFNumExists(inputFNum);
                if(inputFNum.length == 0)
                {
                    DisplayNullError();
                    return;
                }
                if(!isLetters)
                {
                    DisplayCharsError();
                    return;
                }
                if(!doesExists)
                {
                    DisplayNotInTableError();
                    return;
                }
            }

            //
            console.log("Input is correct: " + isLetters);
            console.log("Input is correct: " + doesExists);
           /* */
            switch(opt)
            {
                case "1":
                    OutputAverageGradeOfStudent(xml, inputFNum);
                    break;
                case "2":
                    GetStudentsWithLowerGrade(xml)
                    break;    
                case "3":
                    ShowForm();
                    break;    
                case "4":
                    ShowFormForEdit(inputFNum);
                    break;
                case "5":
                    EraseStudentByFNum(inputFNum);
                    break;
            }
}
function round(number, decimals) { return +(Math.round(number + "e+" + decimals) + "e-" + decimals); }

function DisplayCharsError()
{
    document.getElementById("output").innerHTML="";
    var displayErrorText = document.getElementById("errorText");
    displayErrorText.innerHTML = "Faculty ID must contain only digits!"
    displayErrorText.style.display = "initial";
}

function DisplayNotInTableError()
{
    document.getElementById("output").innerHTML="";
    var displayErrorText = document.getElementById("errorText");
    displayErrorText.innerHTML = "Enter Student with Faculty ID from table!"
    displayErrorText.style.display = "initial";
}

function DisplayNullError()
{
    document.getElementById("output").innerHTML="";
    var displayErrorText = document.getElementById("errorText");
    displayErrorText.innerHTML = "You must enter Faculty ID!"
    displayErrorText.style.display = "initial";
}

function GetValueFromSelect()
{
    var e = document.getElementById("mySelect");
    var opt = e.options[e.selectedIndex].value;
    return opt;
}

function DisableInput()
{
    console.log("select is changed");
    
    var opt = GetValueFromSelect();

    switch(opt)
    {
        case "1":
            document.getElementById("myInput").disabled = false;
            break;
        case "2":
            document.getElementById("myInput").disabled = true;
            break;
        case "3":
            document.getElementById("myInput").disabled = true;
            break;
        case "4":
            document.getElementById("myInput").disabled = false;
            break;
        case "5":
            document.getElementById("myInput").disabled = false;
            break;
    }
}