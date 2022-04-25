<style>
@page {
        size:A4; margin:5mm;
        page-break-after: avoid;
    }

body {
        margin: 0px;
        padding: 10px;
        height:100vh;overflow: hidden;
        /*border: solid 1px #000; border-radius: 5px;*/
    }
table tbody tr td, table tbody tr {
	border-color:'transparent';
}
</style>
<html><body style="text-align: center">
<!-- <div id="footer" style="background-color: lightblue;"><p class="page">Page</p></div><div id="content"> -->
<?php
$html = "";
// foreach ($order as $rows) {$html .= '<table border="0" cellspacing="0" style="width:100%; border-color:transparent; background-color: #efefef;"><tbody><tr style="margin-bottom:0px;"><td style="width: 16.66%; text-align: center;">'.$rows["app_name"].'</td><td style="width: 16.66%; text-align: center;">'.$rows["first_name"].' '.$rows["last_name"].'</td><td style="width: 16.66%; text-align: center;">'.$rows["view"].'</td><td style="width: 16.66%; text-align: center;">'.$rows["product_name"].'</td><td style="width: 16.66%; text-align: center;">'.($rows["color_name"]!=""? $rows["color_name"]:$rows["product_color"]).'</td><td style="width: 16.66%; text-align: center;">Size: '.$rows['product_size'].'</td></tr></tbody></table>
//     // <div style="position:relative; width:100%; height:96.1%;"><img  style="max-width:100%; width:auto; height:auto;" src="'.$rows['png'].' /></div><div style="page-break-before:always;">&nbsp;</div>';}
foreach ($order as $rows) {
    if($rows['png'] != '' && $rows['png'] != null){
    $html .= '
    <div style="position:relative; width:100%; height:96.1%;"><img  style="max-width:100%; width:auto; height:auto;" src="'.$rows['png'].' /></div><div style="page-break-before:always;">&nbsp;</div>';}}
echo preg_replace('/>\s+</', "><", $html);
?>

</body></html>
