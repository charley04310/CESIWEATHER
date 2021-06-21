<?php
        include('db_connect.php');
        $request_method = $_SERVER["REQUEST_METHOD"];

        function getReleveAll($cptId)
        {
                global $conn;
                $query = "SELECT * FROM Releve WHERE Cpt_Id=".$cptId;
                $response = array();
                $result = mysqli_query($conn, $query);
                while($row = mysqli_fetch_array($result))
                {
                        $response[] = $row;
                }
                header('Content-Type: application/json');
                echo json_encode($response, JSON_PRETTY_PRINT);
        }

        function getReleveLast($id,$cptId)
        {
                global $conn;

                if($id = 'last')
                {
                        $query = "SELECT * FROM Releve WHERE Rel_Id = (SELECT MAX(Rel_Id) FROM Releve WHERE Cpt_Id=".$cptId.")";
                }
                $response = array();
                $result = mysqli_query($conn, $query);
                while($row = mysqli_fetch_array($result))
                {
                        $response[] = $row;
                }
                header('Content-Type: application/json');
                echo json_encode($response, JSON_PRETTY_PRINT);
        }


        function getReleveByDate($dateInf,$cptId,$dateSup=NULL)
        {
                global $conn;
                $query = "SELECT * FROM Releve WHERE Cpt_Id=".$cptId;
                if(!empty($dateInf))
                {
                        $query .= " AND Rel_Date >='".$dateInf."'";
                }
                if($dateSup!=NULL)
                {
                      $query .= " AND Rel_Date <='".$dateSup."'";
                }
                $response = array();
                $result = mysqli_query($conn, $query);
                while($row = mysqli_fetch_array($result))
                {
                        $response[] = $row;
                }
                header('Content-Type: application/json');
                echo json_encode($response, JSON_PRETTY_PRINT);
        }

        function addReleves()
        {
                global $conn;
                $content = file_get_contents("php://input");
                $decoded = json_decode($content, true);

                //$relDate = date("Y-m-d H:i:s");  // date gérée par mysql

                $relTemp = floatval($decoded['Rel_Temp']);
                $relHum = floatval($decoded['Rel_Hum']);
                $cptId = intval($decoded['Cpt_Id']);
		$query = mysqli_prepare($conn, "INSERT INTO Releve(Rel_Temp, Rel_Hum, Cpt_Id) VALUES(?,?,?)");
                mysqli_stmt_bind_param($query, "ddi", $relTemp, $relHum, $cptId);

                if($conn)
                {
                        $response1=array(
                        'status' => 1,
                        'status_message' =>'Connexion établie et relevé ajouté avec succès.'
                        );
                        mysqli_stmt_execute($query);
                }
                else
                {
                        $response1=array(
                        'status' => 0,
                        'status_message' =>'Erreur connexion et donc requête non envoyée.'
                        );
                };
                header('Content-Type: application/json');
                echo json_encode($response1);
        }


         switch($request_method)
        {

                case 'GET':
                        if(!empty($_GET["id"]))  //obtenir le dernier relevé pour un capteur precis
                        {
                                $id=$_GET["id"];
                                $cptId=intval($_GET["cptId"]);
                                getReleveLast($id,$cptId);
                        }

                        else if(!empty($_GET["dateSup"]))  //obtenir tous les releves entre 2 dates pour un capteur précis
                        {
                                $cptId=intval($_GET["cptId"]);
                                $dateInf=date("Y-m-d H:i:s",strtotime($_GET["dateInf"]));
                                $dateSup=date("Y-m-d H:i:s",strtotime($_GET["dateSup"]));
                                getReleveByDate($dateInf,$cptId,$dateSup);
                        }
                        else if(!empty($_GET["dateInf"]))   // obtenir tous les relevés à partir d'une date pour un capteur precis.
                        {
                                $cptId=intval($_GET["cptId"]);
                                $dateInf=date("Y-m-d H:i:s",strtotime($_GET["dateInf"]));
                                getReleveByDate($dateInf,$cptId);
                        }
                        else  //obtenir tous les relevés pour un capteur précis
                        {
                               $cptId=intval($_GET["cptId"]);
                               getReleveAll($cptId);
                        }
                        break;

                 case 'POST':
                        //Ajouter un  relevé
                                addReleves();
                                break;

                default:
                        //Invalid Request Method
                        header("HTTP/1.0 405 Method Not Allowed");
                         break;


        }
?>
