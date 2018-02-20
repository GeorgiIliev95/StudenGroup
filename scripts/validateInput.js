function CheckFNumChars(fNum)
{
    var res = fNum.match("^(0|[1-9][0-9]*)$");
    console.log("Resulf of regex: " + res);
    if(res)
    {
        return true;
    }
    return false;
}

function CheckFNumExists(fNum)
{
    var res = document.getElementById(fNum);
    if(res){
        return true;
    }
    return false;
    console.log(res);
}

function CheckName(name)
{
    var res = name.match("^[A-Z][a-z-]{3,19}$");
    console.log("Resulf of name regex: " + res);
    if(res)
    {
        return true;
    }
    return false;
}