<script lang="ts">
	import '../app.css';
	
	let { children } = $props();
</script>

<div class="min-h-screen bg-gray-50">
	<nav class="bg-white shadow-sm border-b-4 border-red-600">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between h-16">
				<div class="flex">
					<div class="flex-shrink-0 flex items-center">
						<a href="/" class="text-xl font-bold text-red-600">Portfolio</a>
					</div>
					<div class="hidden sm:ml-6 sm:flex sm:space-x-8">
						<a href="/" class="inline-flex items-center px-1 pt-1 text-red-600 hover:text-red-400">
							Home
						</a>
						<a href="/about" class="inline-flex items-center px-1 pt-1 text-red-600 hover:text-red-400">
							About
						</a>
						<a href="/chat" class="inline-flex items-center px-1 pt-1 text-red-600 hover:text-red-400">
							Chatbot
						</a>
					</div>
				</div>
			</div>
		</div>
	</nav>

	<!-- svelte-ignore slot_element_deprecated -->
	<main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
		<slot />
	</main>

	<!-- Footer -->
	<footer class="bg-gray-100 text-center py-4 mt-10 border-t-2 border-red-600">
		<p class="text-gray-700">&copy; 2025 Aron Alec Ramos. All rights reserved.</p>
	</footer>
</div>
