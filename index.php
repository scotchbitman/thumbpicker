<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" type="text/css" media="all" href="css/basic.css" />
		<link rel="stylesheet" type="text/css" media="all" href="css/thumbpicker.css" />
		<script type="text/javascript" src="//code.jquery.com/jquery-2.1.1.min.js"></script>
	</head>
	
	<body>
		<div class="container">
			<div class="thumbpicker-frame">
				<img class="thumbpicker" id="plage" src="thumb/01.jpg" />
			</div>
		</div>
		<div>&nbsp;</div>
		<div class="container">
			<div class="thumbpicker-frame">
				<img class="thumbpicker" id="orage" src="thumb/02.jpeg" />
			</div>
		</div>
		<div>&nbsp;</div>
		<div id="ctrl">
			<form name="picker" method="post">
				<input type="submit" value="Envoyer" />
			</form>
		</div>
		
		<div><pre><?php if(!empty($_POST)) print_r($_POST); ?></pre></div>
	
		<script type="text/javascript" src="js/jquery.thumbpicker.js"></script>
		<script type="text/javascript">
			$('.thumbpicker-frame').thumbpicker({"form":"picker"});
		</script>
	</body>
</html>