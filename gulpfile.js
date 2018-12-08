var gulp = require("gulp"),
	server = require("gulp-webserver");
	
	
gulp.task("server",function(){
	return gulp.src("./src")
	.pipe(server({
		port:"9000",
		open:true,
		livereload:true,
		proxies:[
			{
				source:"/api/list",
				target:"http://192.168.2.12:3000/users/api/list"
			}
		]
	}))
})	