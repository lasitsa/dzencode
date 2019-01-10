<template>
	<header class="top-header">
		<div class="top-icon">
			<router-link to="/"><img src="../assets/icon.png" alt="Icon"></router-link>
			<p>Inventory</p>
		</div>
		<input type="text" class="search" placeholder="Поиск">
		<div class="clock">
			<p>{{ day }}</p>
			<div class="clock-second-line">
				<p>{{ date }}</p>
				<span><i class="far fa-clock"></i></span>
				<p>{{ time }}</p>
			</div>
		</div>
	</header>
</template>

<script>
	export default {
		name: 'TopMenu',
		data () {
			return {
				day: "",
				date: "",
				time: ""
			}
		},
		methods: {
			updateDate () {
				let week = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
				let month = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];
				let cd = new Date();
				this.day = week[cd.getDay() - 1];
				this.time = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2);
				this.date = zeroPadding(cd.getDate(), 2) + " " + month[cd.getMonth()] + " " + cd.getFullYear();

				function zeroPadding(num, digit) {
					let zero = '';
					for(let i = 0; i < digit; i++) {
						zero += '0';
					}
					return (zero + num).slice(-digit);
				}
			}
		},
		mounted () {
			this.updateDate();
			setInterval(this.updateDate, 1000);
		}
	}
</script>

<style scoped>
	.top-header {
		height: 75px;
		background: #fff;
		display: flex;
		align-items: center;
		box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.13);
	}
	.top-icon {
		display: flex;
		margin-left: 5%;
		align-items: center;
	}
	.top-icon p {
		text-transform: uppercase;
		color: #7cb342;
		font-weight: 600;
		line-height: 42px;
		margin-left: 20px;
	}
	.search {
		width: 410px;
		background: #f0f3f5;
		padding: 5px;
		border-radius: 5px;
		outline: none;
		margin-left: 10%;
	}
	.search::placeholder {
		font-weight: 600;
	}
	.clock {
		margin-left: 40%;
	}
	.clock p {
		margin: 0;
	}
	.clock .clock-second-line p {
		display: inline-block;
	}
	.clock .clock-second-line span {
		color: #8bc34a;
		margin: 0 10px;
	}
</style>