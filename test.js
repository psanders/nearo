var regex = /(^|\s)(#[a-z\d-]+)/gi;
var str = `#hello This is an #news of some text with #sells - http://www.example.com/#anchor but dont want the link`;
var subst = `$1<span class='hash_tag'>$2</span>`;

// The substituted value will be contained in the result variable
var result = str.replace(regex, subst);

print('Substitution result: ', result);
