<?PHP

$host_name="localhost";

$user_sql="root";

$pass_sql="";

$db_name="fyp";

$condb=mysqli_connect($host_name,$user_sql,$pass_sql,$db_name);

if (!$condb)
{
    die("Connection Fail");
}
else
{
    echo "Connection Successful";
}
?>