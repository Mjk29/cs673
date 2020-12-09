<?php   


	$string = file_get_contents("currentServer.json");

	// var_dump($string);


	$jsonData = json_decode($string, true);

	var_dump($jsonData);
	// echo $jsonData["redirectString"];
	var_dump($jsonData["redirectString"]);

	$last_line = system('kill -0 '.$jsonData["pid"], $retval);
	var_dump($last_line);

	$last_line2 = system('kill -0 2412412', $retval);

	var_dump($last_line2);

	var_dump(proc_get_status($jsonData["pid"]));
	var_dump(proc_get_status(17943));
	var_dump(proc_get_status(17943));

	
	 



	// header("Location: http://afsconnect1.njit.edu:5687")
	// exit();

	// header("Location: ".$jsonData["redirectString"])

	// echo "asdasdas";

	// $last_line = system('ls', $retval);
	// $last_line = system('whoami', $retval);
	// $last_line = system('sh test.sh', $retval);

	// // $last_line = system('su -l mjk29 -c ls < .neededFileForProject', $retval);


	// echo "string ";

	// $last_line = system('whoami', $retval);

	// // echo $last_line;





?>