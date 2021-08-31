$(document).ready(function() {
	$(window).bind('scroll', function() {
	  // The value of where the "scoll" is.
	  if($(window).scrollTop() > 30){
		$('.menuyeri').addClass('fixle');
		$('.gizlilogo').addClass('logogel');
		$('.ben').addClass('logogit');
	  }else{
		$('.menuyeri').removeClass('fixle');
		$('.gizlilogo').removeClass('logogel');
		$('.ben').removeClass('logogit');
	  }
	})
});
  
$(function() {
	$('ul.dropmenu, ul.quickbuttons').superfish({delay : 250, speed: 100, sensitivity : 8, interval : 50, timeout : 1});

	// tooltips
	$('.preview').SMFtooltip();

	// find all nested linked images and turn off the border
	$('a.bbc_link img.bbc_img').parent().css('border', '0');

});

// The purpose of this code is to fix the height of overflow: auto blocks, because some browsers can't figure it out for themselves.
function smf_codeBoxFix()
{
	var codeFix = $('code');
	$.each(codeFix, function(index, tag)
	{
		if (is_webkit && $(tag).height() < 20)
			$(tag).css({height: ($(tag).height() + 20) + 'px'});

		else if (is_ff && ($(tag)[0].scrollWidth > $(tag).innerWidth() || $(tag).innerWidth() == 0))
			$(tag).css({overflow: 'scroll'});

		// Holy conditional, Batman!
		else if (
			'currentStyle' in $(tag) && $(tag)[0].currentStyle.overflow == 'auto'
			&& ($(tag).innerHeight() == '' || $(tag).innerHeight() == 'auto')
			&& ($(tag)[0].scrollWidth > $(tag).innerWidth() || $(tag).innerWidth == 0)
			&& ($(tag).outerHeight() != 0)
		)
			$(tag).css({height: ($(tag).height + 24) + 'px'});
	});
}

// Add a fix for code stuff?
if (is_ie || is_webkit || is_ff)
	addLoadEvent(smf_codeBoxFix);

// Toggles the element height and width styles of an image.
function smc_toggleImageDimensions()
{
	$('.postarea .bbc_img.resized').each(function(index, item)
	{
		$(item).click(function(e)
		{
			$(item).toggleClass('original_size');
		});
	});
}

// Add a load event for the function above.
addLoadEvent(smc_toggleImageDimensions);

function smf_addButton(stripId, image, options)
{
	$('#' + stripId).append(
		'<a href="' + options.sUrl + '" class="button last" ' + ('sCustom' in options ? options.sCustom : '') + ' ' + ('sId' in options ? ' id="' + options.sId + '_text"' : '') + '>'
			+ options.sText +
		'</a>'
	);
}

function toggleDarkMode(element) {
	if (typeof bese_dark_mode_toggle_var === 'undefined' || typeof smf_member_id === 'undefined' || smf_member_id === 0)
		return;

	$(element).before('<div class="sk-chase"><div class="sk-chase-dot"></div><div class="sk-chase-dot"></div><div class="sk-chase-dot"></div><div class="sk-chase-dot"></div><div class="sk-chase-dot"></div><div class="sk-chase-dot"></div></div>');

	var data = {
		"default_options[bese_dark_mode]": bese_dark_mode == 1 ? 0 : 1,
		u: smf_member_id,
		sa: "theme",
		save: 1,
	};
	data[bese_dark_mode_toggle_var] = bese_dark_mode_toggle;
	data[smf_session_var] = smf_session_id;

	$.ajax({
		method: "POST",
		url: smf_scripturl + '?action=profile;area=theme',
		contentType: "application/x-www-form-urlencoded",
		data,
		success() {
			location.reload();
		},
	});

	return false;
}