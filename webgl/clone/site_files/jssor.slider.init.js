jQuery(document).ready(function ($) {
		var jssor_1_options = {
			$AutoPlaySteps: 5,
			$SlideDuration: 160,
			$PauseOnHover: 3,
			$SlideWidth: 185,
			$SlideSpacing: 24,
			$Cols: 5,
			$Align: 1,
			$ArrowNavigatorOptions: {
				$Class: $JssorArrowNavigator$,
				$Steps: 5,
				$ChanceToShow: 1
			}
		};

		var jssor_1_slider = new $JssorSlider$("jssor_1", jssor_1_options);

		/*#region responsive code begin*/
		/*remove responsive code if you don't want the slider scales while window resizing*/
		function ScaleSlider() {
				var refSize = jssor_1_slider.$Elmt.parentNode.clientWidth;
				if (refSize) {
						refSize = Math.min(refSize, 1026);
						jssor_1_slider.$ScaleWidth(refSize);
				}
				else {
						window.setTimeout(ScaleSlider, 30);
				}
		}
		ScaleSlider();
		$(window).bind("load", ScaleSlider);
		$(window).bind("resize", ScaleSlider);
		$(window).bind("orientationchange", ScaleSlider);
		/*#endregion responsive code end*/
});