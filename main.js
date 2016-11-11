const base2str = {
  2: 'bin',
  8: 'oct',
  10: 'dec',
  16: 'hex'
};
function render(props) {
  let { base, value } = props;
  $('.calc')
    .removeClass('bin oct dec hex')
    .addClass(base2str[base]);
  $('.button').removeClass('disabled');
  Object.keys(base2str)
    .filter(base_k => base_k>base)
    .forEach(base_k =>
      $(`.${base2str[base_k]}.button`).addClass('disabled')
    );

  $('.display .value').html(value.toString(base));
  $('.base.hex').html(value.toString(16));
  $('.base.dec').html(value.toString(10));
  $('.base.oct').html(value.toString(8));
  $('.base.bin').html(value.toString(2));
}
$(() => {
  let calc = new Calc();
  render({
    base: calc.base,
    value: 0
  });
  $('.button').on('click', function(e) {
    let content = $(this).data('content');
    calc.exec(content)
      .then(res => {
        let props = {
          base: calc.base,
          value: res,
        };
        render(props);
      })
      .catch(err => {
        console.log(err);
      });
  });
});
