<script>
export default {
	name: 'Connection'
}
</script>

<template>
    <div id="Connection">
        <b-button v-b-toggle.collapse-1 variant="primary">Connexion</b-button>
		<b-collapse id="collapse-1" class="mt-2">
			<b-card>
			</b-card>
		</b-collapse>
    </div>
</template>

<style>
	a {
		text-decoration: none;
	}
</style>