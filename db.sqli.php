<?php
require('encryptar.class.php');
class DB
{
	var $connected = false;
	var $is_debug = true;
	
	private $server;
	private $basedato;
	private $username;
	private $password;

	var $db;
	
	/**
	* Conectarse a la base de datos
	*/
	function __construct()
	{
		$this->db = new mysqli('localhost', 'ucondoagil', 'XxMicolAgil2015.X', 'ca');
		if($this->db->connect_errno > 0){
			die('No se puede conectar a la base de datos 1 [' . $this->db->connect_error . ']');
		} else {
			$this->connected = true;
			/* cambiar el conjunto de caracteres a utf8 */
			if (!$this->db->set_charset("utf8")) {
				printf("Error wait please el conjunto de caracteres utf8: %s\n", $mysqli->error);
			}
		}
	}
	
	/**
	* Conectarse a la base de datos
	*/
	function connected_db()
	{
		$this->db = new mysqli('localhost', 'ucondoagil', 'XxMicolAgil2015.X', 'ca');
		if($this->db->connect_errno > 0){
			die('No se puede conectar a la base de datos 2 [' . $this->db->connect_error . ']');
		} else {
			$this->connected = true;
			/* cambiar el conjunto de caracteres a utf8 */
			if (!$this->db->set_charset("utf8")) {
				printf("Error wait please el conjunto de caracteres utf8: %s\n", $mysqli->error);
			}
		}
	}
	
	/**
	* Conectarse a la base de datos
	*/
	function connection($server, $basedato, $username, $password)
	{
		if(strlen($username) > 15)
		{
			$username = $this->desencriptar($username);
			$password = $this->desencriptar($password);
		}
		$this->db = new mysqli($server, $username, $password, $basedato);
		if($this->db->connect_errno > 0){
			die('No se puede conectar a la base de datos '.$username.' [' . $this->db->connect_error . ']');
		} else {
			$this->connected = true;
			/* cambiar el conjunto de caracteres a utf8 */
			if (!$this->db->set_charset("utf8")) {
				printf("Error wait please el conjunto de caracteres utf8: %s\n", $mysqli->error);
			}
		}
	}
	
	/**
	* Conectarse a la base de datos y retornar
	*/
	function connectionVarios($server, $basedato, $username, $password)
	{
		if(strlen($username) > 15)
		{
			$username = $this->desencriptar($username);
			$password = $this->desencriptar($password);
		}
		$this->db = new mysqli($server, $username, $password, $basedato);
		if($this->db->connect_errno){
			return false;
		} else {
			$this->connected = true;
			return true;
		}
		return true;
	}
	
	function loadConfigVarios($iCodigo)
	{	
		if ($this->connected == true) {
			$settings = $this->getSettingdb($iCodigo);
			
			//Datos basico del plantel
			$this->cod 		= $settings['cod'];
			$this->nombre 	= $settings['nombre'];
			$this->ncorto 	= strtoupper($settings['nombre_corto']);
			$this->logo   	= $settings['logo'];
			$this->ciudad   = $settings['ciudad'];
			
			//Configuracion
			$server   = $settings['server'];
			$basedato = $settings['db'];
			$username = $settings['users'];
			$password = $settings['pass'];
			
			//Constancias - Cronograma
			$this->get_constancia  = $settings['notificacion_const'];
			$this->get_cronograma  = $settings['fromCronograma'];
			
			//Links de recaudos
			$this->rec_admision    = $settings['link_recaudos_admision'];
			$this->rec_inscripcion = $settings['link_recaudos_inscripcion'];
			
			//Perio de año actual
			$this->plantel_prio    = $settings['prio'];
			$this->plantel_ano     = $settings['ano_actual'];
			
			//Estatus DATA
			$this->plantel_estatus_export = $settings['estatus_export'];
			$this->plantel_estatus_fecha  = $settings['fecha_time'];
		}
		$this->connection_close();
		return $this->connectionVarios($server, $basedato, $username, $password);
	}
	
	/* conexion a guiacol */ 
	function loadConfigBd(){
		$query = "SELECT 
						b.cod As cod,
						b.server As server,
						b.db As db,
						b.users As users,
						b.pass As pass
					FROM 
						micole_db AS b
					WHERE b.cod = '101' LIMIT 1";
		$result = $this->send($query);

		if($result->num_rows > 0){
			$rs = $result->fetch_assoc();
			
			//Datos basico del plantel
			$this->cod 		= $rs['cod'];
			
			//Configuracion
			$server   = $rs['server'];
			$basedato = $rs['db'];
			$username = $rs['users'];
			$password = $rs['pass'];
			
			$this->connection_close();
			$this->connection($server, $basedato, $username, $password);
			return true;
		}else{
			return false;
		}
	}
	
	/**
	* Conectado a la base de datos o no
	*
	*/
	function isConnected()
	{
		return $this->connected;
	}
	
	/**
	* Conecte Cerca de la base de datos
	*/
	function connection_close()
	{
		$this->db->close();
	}

	/*
	* Se envía una consulta al servidor de MySQL base de datos
	*/
	function send($query)
	{
		global $_USER, $_DBCOD, $_CODIGO, $_NAMEUSER;
		
		if($_USER){ 
			$userId = 'USUARI ID: '.$_USER." \r\n"; 
		}
		if($_DBCOD){ 
			$userPlantel = 'CODIGO PLANTEL: '.$_DBCOD." \r\n"; 
		}
		if($_CODIGO){ 
			$userCodigo = 'USUARI CODIGO: '.$_CODIGO." \r\n"; 
		}
		if($_NAMEUSER){ 
			$userName = 'USUARI NOMBRE: '.$_NAMEUSER." \r\n"; 
		}
		
		$strDebug = $userId . $userPlantel . $userCodigo . $userName;
		
		if(!$result = $this->db->query($query)){
			$result = false;
			$this->write_debug($strDebug . $query . ' : ' . $this->db->error . "\r\n", 'mysql');
		}
		
		return $result;
	}
	
	function getError(){
		return $this->db->error;
	}
	
	/**
	* Settings de los planteles
	*
	* @param string $cod
	* @return void
	* @author Eliu Florez
	*/
	function getSettingdb($iCodigo)
	{
		if ($iCodigo) {
			$iCodigo = $this->db->real_escape_string($iCodigo);
			$query = "SELECT 
							b.cod As cod,
							b.server As server,
							b.db As db,
							b.users As users,
							b.pass As pass,
							i.nombre As nombre,
							i.nombre_corto As nombre_corto,
							i.logo As logo,
							i.notificacion_const,
							i.fromCronograma,
							i.link_recaudos_admision,
							i.link_recaudos_inscripcion,
							i.ciudad,
							i.prio,
							i.ano_actual,
							i.estatus_export,
							i.fecha_time,
							i.estatus_tiriweb
						FROM 
							micole_db AS b
						LEFT JOIN 
							micole_institucion AS i
						ON(b.cod = i.cod) 
							WHERE i.cod = '$iCodigo' LIMIT 1";
		} else {
			return false;
		}
		$result = $this->send($query);
		if ($result) {
			return $result->fetch_assoc();
		} else {
			return false;
		}
	}
	
	/**
	* load configuracion $id codigo
	*
	* @param string $id
	* @return void
	* @author Eliu Florez
	*/
	function loadConfig($iCodigo)
	{	
		if ($this->connected == true) {
			$settings = $this->getSettingdb($iCodigo);
			
			//Datos basico del plantel
			$this->cod 		= $settings['cod'];
			$this->nombre 	= $settings['nombre'];
			$this->ncorto 	= strtoupper($settings['nombre_corto']);
			$this->logo   	= $settings['logo'];
			$this->ciudad   = $settings['ciudad'];
			
			//Configuracion
			$server   = $settings['server'];
			$basedato = $settings['db'];
			$username = $settings['users'];
			$password = $settings['pass'];
			
			//Constancias - Cronograma
			$this->get_constancia  = $settings['notificacion_const'];
			$this->get_cronograma  = $settings['fromCronograma'];
			
			//Links de recaudos
			$this->rec_admision    = $settings['link_recaudos_admision'];
			$this->rec_inscripcion = $settings['link_recaudos_inscripcion'];
			
			//Perio de año actual
			$this->plantel_prio    = $settings['prio'];
			$this->plantel_ano     = $settings['ano_actual'];
			
			//Estatus DATA
			$this->plantel_estatus_export = $settings['estatus_export'];
			$this->plantel_estatus_fecha  = $settings['fecha_time'];
			
			// estatus tiriweb
			$this->estatustw  = $settings['estatus_tiriweb'];
		}
		$this->connection_close();
		$this->connection($server, $basedato, $username, $password);
	}

	/**
	* consulta general
	* @param query
	* @return array resultado
	*
	*/
	function Consultar($sql)
	{
		$result = $this->send($sql);
		if($result->num_rows > 0){
			return $result->fetch_assoc();
		} else{
			return false;
		}
	}
	
	/**
	 * Returns info consulta - devuelve el resultado en un array bidimencional
	 *
	 * @return void
	 * @author Eliu Florez
	 */
	function getSelect($query, $find = false)
	{
		$result = $this->send($query);
		if($result){
			if($find){
				if ($result->num_rows > 0){
					return $result->fetch_assoc();
				} else {
					return false;
				}
			} else {
				$areaArray = array();
				while ($rs = $result->fetch_assoc()) array_push($areaArray, $rs);
				return $areaArray;
			}
		}
		return false;
	}
	
	/* Delvolver cantidad de filas afectadas (update - delete) */
	function query_filas($query){
		$result = $this->send($query);
		return $this->db->affected_rows;
	}
	
	/**
	 * Querys - cualquier consulta update o delete
	 *
	 * @param string $query
	 * @return void
	 * @author Eliu Florez
	 */
	function querys($query, $create = false)
	{
		$result = $this->send($query);
		if ($this->db->affected_rows > 0 || $create) {
			return true;
		} else {
			return false;
		}
	}	
	
	/**
	 * Update - Registro
	 *
	 * @param string $cod 
	 * @param string $options 
	 * @return void
	 * @author Eliu Florez
	 */
	function updateOpcions($sTable, $sWhere, $rOpcions)
	{
		$i = 0;
		$return = '';
		$countOpcions = (count($rOpcions) - 1);
		foreach ($rOpcions as $key=>$value) {
			if ($i == $countOpcions) {
				if (!is_null($value)) {
					$return .= "`$key`='$value'";
				} else {
					$return .= "`$key`=''";
				}
			} else {
				if (!is_null($value)) {
					$return .= "`$key`='$value', ";
				} else {
					$return .= "`$key`='', ";
				}
			}
			++$i;
		}
		$result = $this->send("UPDATE `$sTable` SET $return WHERE $sWhere");
		if ($this->db->affected_rows > 0) {
			return true;
		} else {
			$this->write_update("ERROR: UPDATE `$sTable` SET $return WHERE $sWhere", 'mysql');
			return false;
		}
	}
	
	/**
	* Insert - Registro
	*
	* @param string $sTable 
	* @param string $options 
	* @return void
	* @author Eliu Florez
	*/
	function insertOpcions($sTable, $rOpcions)
	{
		$i = 0;
		$return = '';
		$countOpcions = (count($rOpcions) - 1);
		foreach ($rOpcions as $key=>$value) {
			if ($i == $countOpcions) {
				if (!is_null($value)) {
					$return .= "`$key`='$value'";
				} else {
					$return .= "`$key`=''";
				}
			} else {
				if (!is_null($value)) {
					$return .= "`$key`='$value', ";
				} else {
					$return .= "`$key`='', ";
				}
			}
			++$i;
		}
		$result = $this->send("INSERT INTO `$sTable` SET $return ;");
		if ($this->db->affected_rows > 0) {
			return true;
		} else {
			return false;
		}
	}
	/**
	 * Devuelve el ID del ultimo insertado
	 * 
	 * @return void
	 * @author Gences Chacin
	 */
	function getIDinsert()
	{
		return $this->db->insert_id;
	}
	
	/**
	 * Se escribe una cadena en el debug.log file
	 *
	 * @param string $string 
	 * @param string $type 
	 * @return void
	 * @author Eliu Florez
	 */
	function write_debug($string, $type)
	{
		$file = 'debug.log';
		$date = date('l jS F Y h:i:s A');
		$fp   = fopen($file, 'a');
		switch ($type) {
			case 'mysql':
				fputs($fp, "\n[MYSQL -- $date ".$this->cod."]\n$string");
			break;
		}
		fclose($fp);
	}
	// update, delete
	function ejecutar($query, $create = false)
	{
		$result = $this->send($query);
		if ($this->db->affected_rows >= 0 || $create) {
			return true;
		} else {
			return false;
		}
	}
	
	/* retorna el boton "Esta Chevere" */
	function getChevere($sCodigo, $url, $tipo, $sWhere = false, $datos = false)
	{
		// cheveres 
		if($sWhere) $sWhere = "AND $sWhere AND link = '$url'";
		$cheveres = $this->getSelect("SELECT * FROM micole_likes WHERE codWeb = '$sCodigo' $sWhere;");
		$urlLiked = $url;
		$liked = false;
		if($sWhere){
			if($cheveres) $liked = true;
		}
		elseif($cheveres){
			foreach($cheveres AS $row){
				if($row['link'] == $urlLiked){
					$liked = true;
					break;
				}
			}
		}
		// tipo boton grande
		if($tipo == 1)
		{
			if($liked){
				$likedButton = '<div style="width: 120px; float: right; background-color: rgb(237, 237, 237); border: 1px solid rgb(204, 204, 204); border-radius: 8px; margin-right: 5px;" id="liked" st="0"><img src="http://www.condominioagil.com/img/ruben1.png" style="margin: 5px 30px 0px auto; float: right;">
					<br><div style="clear: both; text-align: center; width: 60px; font-weight: bold; color: rgb(255, 68, 4); float: right; margin-right: 30px;"><span>Est&aacute;<br/> Ch&eacute;vere!</span></div></div>';
			}
			else{
				$likedButton = '<div style="width: 120px; float: right; background-color: rgb(237, 237, 237); border: 1px solid rgb(204, 204, 204); border-radius: 8px; margin-right: 5px; cursor: pointer;" id="liked" st="1"><img src="http://www.condominioagil.com/img/estachevee60x60.png" srw="http://www.condominioagil.com/img/ruben1.png" style="margin: 5px 30px 0px auto; float: right;">
					<br><div style="clear: both; text-align: center; width: 60px; font-weight: bold; color: rgb(255, 68, 4); float: right; margin-right: 30px;"><span>Est&aacute;<br/> Ch&eacute;vere?</span></div></div>';
			}
		} // tipo boton mediano
		elseif($tipo == 2)
		{
			if($liked){
				$likedButton = '<div style="width: 70px; background-color: rgb(237, 237, 237); border: 1px solid rgb(204, 204, 204); border-radius: 8px; margin-right: 5px; float: left;" class="liked" st="0" datos="'.$datos.'"><img src="http://www.condominioagil.com/img/ruben30.png" style="float: right; margin: 5px 20px 0px auto;">
					<br><div style="clear: both; text-align: center; width: 70px; font-weight: bold; color: rgb(255, 68, 4); float: right; font-size: 12px;"><span>Est&aacute;<br/> Ch&eacute;vere!</span></div></div>';
			}
			else{
				$likedButton = '<div style="width: 70px; background-color: rgb(237, 237, 237); border: 1px solid rgb(204, 204, 204); border-radius: 8px; margin-right: 5px; cursor: pointer; float: left;" class="liked" st="1" datos="'.$datos.'"><img src="http://www.condominioagil.com/img/estachevere30x30.png"  srw="http://www.condominioagil.com/img/ruben30.png" style="float: right; margin: 5px 20px 0px auto;">
					<br><div style="clear: both; text-align: center; width: 70px; font-weight: bold; color: rgb(255, 68, 4); float: right; font-size: 12px;"><span>Est&aacute; <br/>Ch&eacute;vere?</span></div></div>';
			}
		} // tipo cabecera
		elseif($tipo == 3)
		{
			if($liked){
				$likedButton = "<a class='close' id='liked' style='width:120px;cursor:default' st='0'><img src='http://www.condominioagil.com/img/ruben1.png' height='50'><br/><span>Est&aacute; Ch&eacute;vere!</span></a>";
			}
			else{
				$likedButton = "<a class='close' id='liked' style='width:120px;cursor:pointer' st='1'><img src='http://www.condominioagil.com/img/estachevee60x60.png' srw='http://www.condominioagil.com/img/ruben1.png' height='50'><br/><span>Est&aacute; Ch&eacute;vere?</span></a>";
			}
		}
		return $likedButton;
	}
	// contador de cheveres
	function countCheveres(){
		$cheveres = $this->Consultar("SELECT COUNT(*) AS cant FROM micole_likes");
		if($cheveres) return $cheveres['cant'];
		return false;
	}
	// codificar
	function encode_this($string)
	{
		$string = utf8_encode($string);
		$llave = "micole".date('dmY'); 
		$string = $llave.$string.$llave; 
		$string = base64_encode($string);
		return($string);
	}
	//decodificar
	function decode($string)
	{
		$string = base64_decode($string); 
		$llave = "micole".date('dmY');
		$string = str_replace($llave, "", $string); 

		return utf8_decode($string);
	}
	/**
	* Se utiliza como un equivalente de mysql_real_escape_string ()
	* Tomado de bibliotecas Partystic
	*
	* @param string $query 
	* @param string $vars 
	* @return void
	*/
	function clean($query, $vars)
	{
		$query_length = strlen($query);
		if (count($vars) > 0) {
			$result = '';
			for ($i = 0, $varsParsed = 0; $i < $query_length; ++$i) {
				if ($query[$i] == "\\" and $query[$i + 1] == '%') {
					$result .= '%';
					++$i;
				} else if ($query[$i] != '%') {
					$result .= $query[$i];
				} else {
					if ($query[$i + 1] == 'i') {
						$result .= (int)$vars[$varsParsed];
					} else if ($query[$i + 1] == 's') {
						if ($query[$i - 1] == '`') {
							$toInclude = str_replace('`', '``', $vars[$varsParsed]);
						} else {
							$toInclude = str_replace("\\", "\\\\", $vars[$varsParsed]);
							$toInclude = str_replace($query[$i - 1], "\\" . $query[$i - 1], $toInclude);
						}
						$result .= $toInclude;
					}
					++$varsParsed;
					++$i;
				}
			}
			return $result;
		}
		return $query;
	}
	/**
	* Login usuarios
	*
	* @param string $users
	* @param string $pass
	* @param integer $codigo
	* @return void
	* @author Eliu Florez
	*/
	function getUsers($username, $password, $codigo = false, $nivel_panel = false, $cod = false)
	{
		if($nivel_panel == true){
			$sWhere = "cod = '%s' AND estatus = '1'";
		} else {
			$sWhere = "codigo = '%s' AND estatus = '1'";
		}
		$username = @mysql_real_escape_string(strtoupper($username));
		$password = @mysql_real_escape_string(strtoupper($password));
		if (((strlen($codigo)==10 || strlen($codigo)==11) and is_numeric($codigo)) or $nivel_panel == true) {
			if($codigo == 771){
				$codigo = 777;
				$sWhere .= " AND nivel = '7'";
			}
			$query = $this->clean("SELECT * FROM micole_usuarios WHERE $sWhere ORDER BY id ASC LIMIT 1", array($codigo));
		} else {
			if (!empty($username) && !empty($password)) {
				$query = $this->clean("SELECT * FROM micole_usuarios WHERE coduser = '%s' AND codpass = '%s' AND estatus = '1' LIMIT 1", array($username, $password));
			} else {
				return false;
			}
		}
		
		if($cod && $codigo == 777){
			$query = "SELECT * FROM micole_usuarios WHERE id='$cod' LIMIT 1";
		}
		$result = $this->Consultar($query);
		if (!$result) {
			return false;
		} else {
			return $result;
		}
	}
	/**
	 * Settings de los planteles
	 *
	 * @param string $cod
	 * @return void
	 * @author Eliu Florez
	 */
	function getSettingUsers($iCodigo)
	{
		if ($iCodigo) {
			$query = "SELECT codGrado, codArea, codDistribucion FROM micole_usuarios_grado WHERE codDocente = '$iCodigo' ORDER BY codGrado, codArea, codDistribucion";
		} else {
			return false;
		}
		$result = $this->getSelect($query);
		if (!$result) {
			return false;
		} 
		else {
			return $result;
		}
	}
	// inicio de sesion
	function loginMicole($codWeb){
		if ((strlen($codWeb) == 10 || strlen($codWeb) == 11) and is_numeric($codWeb)) {
			$userInfo = $this->getUsers(false, false, $codWeb);
			if ($userInfo) {
				if($userInfo['intento'] <= 4 and $userInfo['estatus'] != 0) {
					$ip = $_SERVER['REMOTE_ADDR'];
					$this->querys("UPDATE micole_usuarios SET intento = 0, fecha=CURRENT_DATE, timestamp='".time()."', ip='$ip' WHERE codigo = '$codWeb'");
					$_ID = $userInfo['id'];
					session_start();
					$_SESSION['ID'] 		= $userInfo['id'];
					$_SESSION['CODIGO'] 	= $userInfo['codigo'];
					$_SESSION['CODPLANTEL'] = $userInfo['cod'];
					$_SESSION['NAMEUSER']   = $userInfo['nombre'];
					$_SESSION['NIVEL']      = $userInfo['nivel_acceso'];
					$_SESSION['ETAPA']      = $userInfo['nivel_etapa'];
					$_SESSION['LOGIN']      = true;
					$_SESSION['IDLOGIN']	= $userInfo['id'];
					$result = $this->getSettingUsers($_ID);
					if($result){
						$return = array();
						foreach($result as $rs){
							$returni['codGrado']        = $rs['codGrado'];
							$returni['codArea']         = $rs['codArea'];
							$returni['codDistribucion'] = $rs['codDistribucion'];
							$return[] = $returni;
						}
						$_SESSION['AREA'] = $return;
					}
					if(strpos($userInfo['nivel_acceso'], '700') !== false){
						$datosDocente = $this->Consultar("SELECT * FROM `micole_usuarios_docente` WHERE codigo = '".$userInfo['codigo']."' LIMIT 1");
						$_SESSION['ccedula'] = $datosDocente['cedula'];
						$_SESSION['cnombre'] = $datosDocente['nombre'];
					}
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		} 
		else {
			return false;
		}		
	}
	
	// retornar Array grado y seccion de la variable session[Area]
	function getGradoSeccion(){
		session_start();
		if($_SESSION['AREA'] != "")
		{
			$rsAreas  = $_SESSION['AREA'];
			$cAreas   = count($rsAreas);
			$return = array();
			if($cAreas > 0){
				$return['grado']    = $rsAreas[0]['codGrado'];
				$rsSecciones 		= explode(',',$rsAreas[0]['codArea']);
				$sSession	 		= $rsSecciones[0];
				$return['seccion']	= $sSession[0];
				$return['area']		= $rsAreas[0]['codDistribucion'];
				
				return $return;
			}
			return false;
		}
		return false;
	}
	// retorna el lapso del plantel actual
	function getPlantelLapso(){
		$datos = explode('|',$this->plantel_prio);
		return $datos[1];
	}
	
	function encriptar($texto){
		$encrypt = new Encryptar;
		return $encrypt->encrypt($texto);
	}
	function desencriptar($texto){
		$encrypt = new Encryptar;
		return $encrypt->decrypt($texto);
	}
}

?>