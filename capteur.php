<?php
//echo  "Hello Cpt";

        // Connect to database
        include("db_connect.php");
        $request_method = $_SERVER["REQUEST_METHOD"];

        function getCapteurAll()
        {
                global $conn;
                $query = "SELECT * FROM Capteur";
                $response = array();
                $result = mysqli_query($conn, $query);
                while($row = mysqli_fetch_array($result))
                {
                        $response[] = $row;
                }
                header('Content-Type: application/json');
                echo json_encode($response, JSON_PRETTY_PRINT);
        }

        function getCapteurById($id)
        {
                global $conn;
                $query = "SELECT * FROM Capteur";
                if($id != 0)
                {
                        $query .= " WHERE Cpt_Id=".$id." LIMIT 1";
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

        function addCapteur()
        {
                global $conn;

                $content = file_get_contents("php://input");
                $decoded = json_decode($content, true);

                $CptLatitude = floatval($decoded['Cpt_Latitude']);
                $CptLongitude = floatval($decoded['Cpt_Longitude']);
                $CptAdresse = $decoded['Cpt_Adresse'];
                //$CptDateInstallation = $decoded["Cpt_DateInstallation"];  date gérée par Bdd
                $CptActivation = intval($decoded['Cpt_Activation']);
                $CptCaracteristique = $decoded['Cpt_Caracteristique'];

                $query="INSERT INTO Capteur (Cpt_Latitude, Cpt_Longitude , Cpt_Adresse,  Cpt_Activation,Cpt_Caracteristique) 
                     VALUES(".$CptLatitude.",".$CptLongitude.",'".$CptAdresse."',".$CptActivation.",'".$CptCaracteristique."')";
                //$query = $conn -> prepare('INSERT INTO Releve(Rel_Temp,Rel_Hum,Cpt_Id) VALUES (?,?,?)');
               // $query -> execute(array($relTemp,$relHum,$cptId));
               //echo $query;

                if(mysqli_query($conn, $query))
                {
                        $response=array(
                                'status' => 1,
                                'status_message' =>'Capteur ajouté avec succés.'
                        );
                }
                else
                {
                        $response=array(
                                'status' => 0,
                                'status_message' =>'Echec ajout capteur: '. mysqli_error($conn)
                        );
                }
                header('Content-Type: application/json');
                echo json_encode($response);
        }

        function updateCapteur($id)
        {
                global $conn;
                $content = file_get_contents("php://input");
                $decoded = json_decode($content, true);

                $CptLatitude = floatval($decoded["Cpt_Latitude"]);
                $CptLongitude = floatval($decoded["Cpt_Longitude"]);
                $CptAdresse = $decoded["Cpt_Adresse"];
                //$CptDateInstallation = date("Y-m-d H:i:s");
                $CptDateInstallation = date("Y-m-d H:i:s",strtotime($decoded["Cpt_DateInstallation"]));
                $CptActivation = floatval($decoded["Cpt_Activation"]);
                $CptCaracteristique = $decoded["Cpt_Caracteristique"];

                $query="UPDATE Capteur SET Cpt_Latitude=".$CptLatitude.", Cpt_Longitude=".$CptLongitude.", Cpt_Adresse='".$CptAdresse."',
                Cpt_DateInstallation='".$CptDateInstallation."', Cpt_Activation=".$CptActivation.",Cpt_Caracteristique='".$CptCaracteristique."' WHERE Cpt_Id=".$id;

                if(mysqli_query($conn, $query))
                 {
                        $response=array(
                                'status' => 1,
                                'status_message' =>'capteur mis a jour avec succes.'
                         );
                }
                else
                 {
                        $response=array(
                                'status' => 0,
                                'status_message' =>'Echec de la mise à jour du capteur: '. mysqli_error($conn)
                         );

                 }

                header('Content-Type: application/json');
                echo json_encode($response);
        }

        function deleteCapteur($id)
        {
                global $conn;
                $query = "DELETE FROM Capteur WHERE Cpt_Id=".$id;
                if(mysqli_query($conn, $query))
                {
                        $response=array(
                                'status' => 1,
                                'status_message' =>'Capteur supprimé avec succes.'
                         );
                 }
                 else
                {
                        $response=array(
                                'status' => 0,
                                'status_message' =>'La suppression du capteur a échoué: '. mysqli_error($conn)
                         );
                 }
                header('Content-Type: application/json');
                echo json_encode($response);
        }


        switch($request_method)
        {

                case 'GET':

                        if(!empty($_GET["id"]))  //obtenir un capteur par id
                        {
                                $id=intval($_GET["id"]);
                                getCapteurById($id);
                        }
                        else  //obtenir tous les capteurs
                        {
                                getCapteurAll();
                        }
                        break;

                case 'POST':
                        //Ajouter un capteur
                                addCapteur();
                                break;

                case 'PUT':
                        // Modifier un  capteur
                        $id = intval($_GET["id"]);
                        updateCapteur($id);
                        break;

                case 'DELETE':
                        // Supprimer un capteur
                        $id = intval($_GET["id"]);
                        deleteCapteur($id);
                        break;

                default:
                        //Invalid Request Method
                        header("HTTP/1.0 405 Method Not Allowed");
                        break;

        }
?>

