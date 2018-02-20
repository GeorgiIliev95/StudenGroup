<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">      
<xsl:template match="/">    
    <html>
    <head>
    <title>StudentGroup</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"/>
    <link rel="stylesheet" href="styles/table.css" type="text/css"/>
    <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Lato:100,300,400"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.2/css/bootstrap-select.min.css"/>
    
    </head>
        <body>
        <div class="scroll">
            <table id="studentGroupTable">
                <tr>
                    <th>Name</th>                    
                    <th>Last Name</th>
                    <th>Faculty Number</th>               
                </tr>               
                <xsl:for-each select="studentGroup/student">
                    <tr class="student" >
                        <xsl:attribute name="id"> 
                            <xsl:value-of select="fNum" />      
                        </xsl:attribute>
                        <td><xsl:value-of select="name" /></td>
                        <td><xsl:value-of select="lastName" /></td>
                        <td id="fNum"><xsl:value-of select="fNum" /></td>                        
                    </tr>
                   
                        <tr class="marks"><td colspan="3" name="mark0">Mark of Computer Architecture: <mark ><xsl:value-of select="subjectMark[@name='ComputerArchitecture']" /></mark></td></tr>
                        <tr class="marks"><td colspan="3" name="mark1">Mark of Software Technologies: <mark ><xsl:value-of select="subjectMark[@name='SoftwareTechnologies']" /></mark></td></tr>
                        <tr class="marks"><td colspan="3" name="mark2">Mark of Databases: <mark ><xsl:value-of select="subjectMark[@name='Databases']" /></mark></td></tr>
                        <tr class="marks"><td colspan="3" name="mark3">Mark of Computer Graphics: <mark ><xsl:value-of select="subjectMark[@name='ComputerGraphics']" /></mark></td></tr>
                        <tr class="marks lastmark"><td colspan="3" name="mark4">Mark of Computer Comunications: <mark ><xsl:value-of select="subjectMark[@name='ComputerComunications']" /></mark></td></tr>
                                     
                                                       
                </xsl:for-each>
            </table>
            </div>
            <div class="inputs" style="width:100%;"> 
                <input type="text" id="myInput" placeholder="Search for Faculty number" title="Type in a Faculty number"/>
                <select name="" id="mySelect" class="selectpicker" onchange="DisableInput()">
                <option value="1">Calculate average Grade Point</option>
                <option value="2">Students with grade lower than average</option>
                <option value="3">Add new student</option>
                <option value="4">Edit student</option>
                <option value="5">Erase student</option>
                </select>
                <button type="button" class="btn-primary" id="myBtn" onclick="loadDoc()">Go!</button>
            </div>
        <p class="bg-danger" style="padding:10px;font-size:18px;display:none;" id="errorText"></p>
        <div id="output" class="container">
        </div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script
  src="https://code.jquery.com/jquery-3.1.1.min.js"
  integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
  crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.2/js/bootstrap-select.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
        <script src="scripts/marksToggle.min.js" type="text/javascript"></script>
        <script src="scripts/studentGroup.js" type="text/javascript"></script>
        <script src="scripts/alterDatabase.js" type="text/javascript"></script>
        <script src="scripts/validateInput.js" type="text/javascript"></script>
        </body>
         
    </html>
  
</xsl:template>
</xsl:stylesheet>