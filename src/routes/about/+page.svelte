<div class="bg-white py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl">
      <h2 class="text-3xl font-bold tracking-tight text-red-600 sm:text-4xl">About Me</h2>
      <p class="mt-6 text-lg leading-8 text-gray-600">
        I am Aron Alec Ramos, 21 years old. A 4th-year Computer Science student at Gordon College with a strong foundation in programming, algorithms, and software development. Passionate about solving complex problems and building innovative solutions.
        Currently seeking on-the-job training or internship opportunities to gain practical experience in software engineering, data analysis, web/mobile development, as well as artificial intelligence, machine learning, and computer vision.
        Proficient in Python, C#, Flutter, Firebase, Unity, Computer Vision, with a keen interest in Artificial Intelligence, Machine Learning, and Networking.
      </p>

      <!-- Programming Skills -->
      <div class="mt-10">
        <h3 class="text-xl font-semibold text-red-600">Skills (Programming)</h3>
        <ul class="mt-4 grid grid-cols-2 gap-4 text-base text-gray-600">
          {#each ["Flutter (Frontend)", "Firebase (Backend)", "Python", "C#", "Unity", "Computer Vision", "Arduino"] as skill}
            <li class="flex items-center">
              <svg class="h-5 w-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {skill}
            </li>
          {/each}
        </ul>
      </div>

      <!-- Hardware Skills -->
      <div class="mt-10">
        <h3 class="text-xl font-semibold text-red-600">Skills (Hardware)</h3>
        <ul class="mt-4 grid grid-cols-2 gap-4 text-base text-gray-600">
          {#each ["Networking", "Troubleshooting", "Computer Maintenance", "Robotics", "Arduino"] as skill}
            <li class="flex items-center">
              <svg class="h-5 w-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {skill}
            </li>
          {/each}
        </ul>
      </div>

      <!-- Certificates -->
      <div class="mt-10">
        <h3 class="text-xl font-semibold text-red-600">Certificates</h3>
        <div class="mt-4">
          {#each [
            { title: "Introduction on Artificial Intelligence", org: "DICT ZAMBOANGA", date: "November 19, 2024" },
            { title: "Natural Language Processing Fundamentals", org: "Asia Open RAN Academy", date: "October 26, 2024" },
            { title: "Artificial Intelligence/Machine Learning", org: "Asia Open RAN Academy", date: "October 12, 2024" }
          ] as cert}
            <div class="mb-4">
              <h4 class="font-semibold text-gray-800">{cert.title}</h4>
              <p class="text-gray-600">{cert.org}</p>
              <p class="text-gray-500 text-sm">{cert.date}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>