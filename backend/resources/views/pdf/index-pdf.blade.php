<style>
@page {
        /* size:A4; margin:5mm; */
        /* margin: 1.75cm 1.75cm 1.5cm 1.5cm; */
        page-break-after: avoid;
    }

body {
        margin: 0px;
        /* padding-top: 180.402pt; */
        height:100vh;overflow: hidden;
        /* border: solid 1px #000; border-radius: 5px; */
    }
table tbody tr td, table tbody tr {
    border-color:'transparent';
}
</style>
<html><body style="text-align: center">
<!-- <div id="footer" style="background-color: lightblue;"><p class="page">Page</p></div><div id="content"> -->
<?php
$html = "";
foreach ($order as $rows) {
    if($rows['print_location'] == 'front_only' && $rows['view'] == 'Front'){
        $html .= '<table border="0" cellspacing="0" style="width:100%; border-color:transparent;margin-bottom:15px;font-size:25px;"><tbody><tr style="margin-bottom:0px;"><td style="width: 16.66%; text-align: center;">'.$rows["app_name"].'</td><td style="width: 16.66%; text-align: center;">'.$rows["first_name"].' '.$rows["last_name"].'</td><td style="width: 16.66%; text-align: center;">'.$rows["view"].'</td><td style="width: 16.66%; text-align: center;">'.$rows["product_name"].'</td><td style="width: 16.66%; text-align: center;">'.($rows["color_name"]!=""? $rows["color_name"]:$rows["product_color"]).'</td><td style="width: 16.66%; text-align: center;">Size: '.$rows['product_size'].'</td></tr></tbody></table>
    <div class="front" style="position:relative; width:100%; height:96.1%;"><img  style="position: absolute;
    bottom: 0;padding-top:80pt;max-width:100%; width:auto; height:auto;" src="'.$rows['png'].' /></div><div style="page-break-before:always;">&nbsp;</div>';
    
    }else if($rows['print_location'] == 'back_only'  && $rows['view'] == 'Back'){

        $html .= '<table border="0" cellspacing="0" style="width:100%; border-color:transparent;margin-bottom:15px;font-size:25px;"><tbody><tr style="margin-bottom:0px;"><td style="width: 16.66%; text-align: center;">'.$rows["app_name"].'</td><td style="width: 16.66%; text-align: center;">'.$rows["first_name"].' '.$rows["last_name"].'</td><td style="width: 16.66%; text-align: center;">'.$rows["view"].'</td><td style="width: 16.66%; text-align: center;">'.$rows["product_name"].'</td><td style="width: 16.66%; text-align: center;">'.($rows["color_name"]!=""? $rows["color_name"]:$rows["product_color"]).'</td><td style="width: 16.66%; text-align: center;">Size: '.$rows['product_size'].'</td></tr></tbody></table>
    <div class="back" style="position:relative; width:100%; height:96.1%;"><img  style="position: absolute;
    bottom: 0;padding-top:80pt;max-width:100%; width:auto; height:auto;" src="'.$rows['png'].' /></div><div style="page-break-before:always;">&nbsp;</div>';

    }else if($rows['print_location'] == 'both'){
        
    $html .= '<table border="0" cellspacing="0" style="width:100%; border-color:transparent;margin-bottom:15px;font-size:25px;"><tbody><tr style="margin-bottom:0px;"><td style="width: 16.66%; text-align: center;">'.$rows["app_name"].'</td><td style="width: 16.66%; text-align: center;">'.$rows["first_name"].' '.$rows["last_name"].'</td><td style="width: 16.66%; text-align: center;">'.$rows["view"].'</td><td style="width: 16.66%; text-align: center;">'.$rows["product_name"].'</td><td style="width: 16.66%; text-align: center;">'.($rows["color_name"]!=""? $rows["color_name"]:$rows["product_color"]).'</td><td style="width: 16.66%; text-align: center;">Size: '.$rows['product_size'].'</td></tr></tbody></table>
    <div class="both" style="position:relative; width:100%; height:96.1%;"><img  style="position: absolute;
    bottom: 0;padding-top:100pt;max-width:100%; width:auto; height:auto;" src="'.$rows['png'].' /></div><div style="page-break-before:always;">&nbsp;</div>';
    // $html .= '
    // <div style="position:relative; width:100%; height:96.1%;"><img  style="width:2000px; height:2000px;" src="'.$rows['png'].' /></div><div style="page-break-before:always;">&nbsp;</div>';
}}
echo preg_replace('/>\s+</', "><", $html);

// foreach ($order as $rows) {$html .= '<table border="0" cellspacing="0" style="width:100%; border-color:transparent; background-color: #efefef;"><tbody><tr style="margin-bottom:0px;"><td style="width: 16.66%; text-align: center;">'.$rows["app_name"].'</td><td style="width: 16.66%; text-align: center;">'.$rows["first_name"].' '.$rows["last_name"].'</td><td style="width: 16.66%; text-align: center;">'.$rows["view"].'</td><td style="width: 16.66%; text-align: center;">'.$rows["product_name"].'</td><td style="width: 16.66%; text-align: center;">'.($rows["color_name"]!=""? $rows["color_name"]:$rows["product_color"]).'</td><td style="width: 16.66%; text-align: center;">Size: '.$rows['product_size'].'</td></tr></tbody></table>
//  <div style="position:relative; width:100%; height:96.1%;"><img  style="max-width:100%; width:auto; height:auto;" src="'.$rows['png'].' /></div><div style="page-break-before:always;">&nbsp;</div>';}
// echo preg_replace('/>\s+</', "><", $html);
?>

</body></html>
