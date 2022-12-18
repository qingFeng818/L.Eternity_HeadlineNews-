module.exports = {
  plugins: {
    'postcss-pxtorem': {
      /*    rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      }, */
      rootValue: ({ file }) => (/vant/i.test(file) ? 37.5 : 75),
      /*   rootValue(module) {
        console.log(module)
      }, */
      propList: ['*']
    }
  }
}
// console.log(module)
