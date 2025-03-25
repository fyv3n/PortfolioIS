<div class="bg-white py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Chatbot</h2>
      <p class="mt-6 text-lg leading-8 text-gray-600">
        Chat with our AI assistant (Blitzcrank) to get information and assistance.
      </p>
      
      <!-- chat container -->
      <div class="mt-10 bg-gray-100 rounded-lg p-6 shadow-md max-h-[500px] overflow-y-auto" bind:this={chatContainer}>
        <div id="chat-messages" class="space-y-4">
          {#each chatHistory as message}
            <div class="flex {message.role === 'user' ? 'justify-end' : 'justify-start'}">
              <div class="max-w-[80%] rounded-lg p-3 {message.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-900'}">
                {@html md.render(message.content)}
              </div>
            </div>
          {/each}
          {#if isLoading}
            <div class="flex justify-start">
              <div class="bg-white text-gray-900 rounded-lg p-3">
                Processing...
              </div>
            </div>
          {/if}
        </div>
      </div>
      
      <!-- Input Field -->
      <div class="mt-4 flex items-center border rounded-lg p-2 shadow-md">
        <input 
          type="text" 
          bind:value={chat}
          on:keydown={(e: KeyboardEvent) => e.key === 'Enter' && sendMessage()}
          class="flex-1 px-4 py-2 text-gray-900 border-none focus:ring-0" 
          placeholder="Type a message..." 
        />
        <button 
          on:click={sendMessage}
          class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</div>

<script lang="ts">
  import { onMount } from "svelte";
  import MarkdownIt from "markdown-it";

  let md = new MarkdownIt();
  let chat = ""; // User input message
  let response = ""; // Stores chatbot response
  let chatHistory: { role: string; content: string }[] = [];
  let isLoading = false;
  let error = "";
  let renderedResponse = "";
  let chatContainer: HTMLDivElement;

  $: if (md) renderedResponse = md.render(response);

  // Function to scroll chat to bottom
  function scrollToBottom() {
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }

  // Watch chatHistory for changes and scroll to bottom
  $: {
    if (chatHistory.length > 0) {
      setTimeout(scrollToBottom, 100);
    }
  }

  async function sendMessage() {
    if (!chat.trim()) return; // Prevent empty messages

    isLoading = true;
    const userMessage = chat;
    chat = ""; // Clear input field

    console.log("Sending message:", userMessage);

    // Add user message to chat history
    chatHistory = [...chatHistory, { role: "user", content: userMessage }];
    console.log("Updated chat history:", chatHistory);

    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      console.log("Received response:", data);

      if (res.ok) {
        chatHistory = [...chatHistory, { role: "assistant", content: data.response }];
        response = data.response;
        console.log("Updated chat history with response:", chatHistory);
      } else {
        throw new Error(data.error || "Failed to get response");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to get response from the model");
    } finally {
      isLoading = false;
    }
  }
</script>
