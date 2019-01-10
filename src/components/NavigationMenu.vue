<template>
	<section class="left-menu">
		<div class="avatar">
			<img class="avatar-image" src="../assets/user.png" alt="User">
			<img class="setting-btn" src="../assets/some-icon-2.png" alt="some icon">
		</div>
		<ul class="nav">
			<li><router-link to="/">Приход</router-link></li>
			<li><a href="#">Группы</a><li>
			<li><router-link to="/products">Продукты</router-link></li>
			<li><a href="#">Пользователи</a></li>
			<li><a href="#">Настройки</a></li>
		</ul>
	</section>
</template>

<script>
	
</script>

<style scoped>
	.left-menu {
		width: 200px;
		box-shadow: 5px 0px 10px 0px rgba(0, 0, 0, 0.13);
		display: inline-block;
		height: calc(100vh - 70px);
	}
	.avatar {
		position: relative;
		margin: 50px 0;
		text-align: center;
	}
	.avatar-image {
		width: 90px;
		height: 90px;
	}
	.setting-btn {
		padding: 12px;
		background: #fff;
		position: absolute;
		top: 55px;
		right: 50px;
		border-radius: 100em;
		box-shadow: 5px 0px 10px 0px rgba(0, 0, 0, 0.13);
	}
	.nav {
		margin: 0;
		padding: 0;
	}
	.nav li {
		text-align: center;
		list-style-type: none;
		margin-bottom: 35px;
	}
	.nav li a {
		text-decoration: none;
		color: #36454d;
		text-transform: uppercase;
		font-weight: 600;
	}
	.router-link-exact-active {
		border-bottom: 3px solid #8bc34a;
	}
</style>