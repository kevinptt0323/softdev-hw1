function render(props) {
  let { base, value } = props;
  $('.display .value').html(value.toString(base));
  $('.base.hex').html(value.toString(16));
  $('.base.dec').html(value.toString(10));
  $('.base.oct').html(value.toString(8));
  $('.base.bin').html(value.toString(2));
}
$(() => {
  let calc = new Calc();
  $('.button').on('click', function(e) {
    let content = $(this).data('content');
    calc.exec(content)
      .then(res => {
        let props = {
          value: res,
          base: calc.base
        };
        render(props);
      })
      .catch(err => {
        console.log(err);
      });
  });
});
