module.exports={
    default:'theme',
    themes:[
        {
            type:'theme-pc',
            alias:'pc端',
            name:'pc',
            src:'src/assets/scss/pc',
            output:'src/assets/css/pc',
            variables: [
                "src/assets/scss/pc/tokens/_variables-theme-cn.scss",
            ]
        },
        {
            type:'theme-mobile',
            alias:'mobile端',
            name:'mobile',
            src:'src/assets/scss/mo',
            output:'src/assets/css/mo',
            variables: [
                "src/assets/scss/pc/tokens/_variables-theme-cn.scss",
            ]
        },
    ]
}