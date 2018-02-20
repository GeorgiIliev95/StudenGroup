<?php
if(isset($_POST['xml'])){
$xml = $_POST['xml'];
echo $xml;
}
$fileXml = fopen("StudentGroup.xml", "w");
fwrite($fileXml, $xml);
fclose($fileXml);
?>