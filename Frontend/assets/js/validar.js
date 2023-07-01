const codeInputs = document.querySelectorAll('.code-input');

  codeInputs.forEach((input, index) => {
    input.addEventListener('input', function() {
      this.value = this.value.toUpperCase();

      if (this.value.length === this.maxLength) {
        if (index < codeInputs.length - 1) {
          codeInputs[index + 1].focus();
        } else {
          this.blur();
        }
      }
    });

    input.addEventListener('paste', function(e) {
      e.preventDefault();
      const pastedData = e.clipboardData.getData('text');
      const parts = pastedData.split('-');

      parts.forEach((part, i) => {
        if (i < codeInputs.length) {
          codeInputs[i].value = part.substr(0, codeInputs[i].maxLength).toUpperCase();
          if (i < codeInputs.length - 1) {
            codeInputs[i + 1].focus();
          } else {
            codeInputs[i].blur();
          }
        }
      });
    });
  });

  const form = document.querySelector('form');
  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    const code = Array.from(codeInputs).map(input => input.value).join('-');
    const response = await validate(code);
    console.log(response);
    if (response.error){
        alert(response.message);
        } else {
        alert(response.message);
        window.location.href = "certificate.html?code=" + code;
    }


  });