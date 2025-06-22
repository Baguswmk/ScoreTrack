<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold ">Mentors</h2>
      <button @click="showAddMentorModal = true"
        class="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 cursor-pointer">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span>Add Mentor</span>
      </button>

      <!-- Add Mentor Modal -->
      <div v-if="showAddMentorModal" :style="{ backgroundColor: 'rgba(75, 85, 99, 0.75)' }"
        class="fixed inset-0 flex items-center justify-center z-50">
        <div class="bg-white text-gray-700  rounded-lg shadow-lg w-full max-w-md p-6">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Add New Mentor</h3>
          <form @submit.prevent="handleAddMentor">
            <div class="space-y-4">
              <input v-model="newMentor.name" type="text" placeholder="Mentor Name" required
                class="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div class="flex justify-end space-x-2 mt-4">
              <button type="button" @click="showAddMentorModal = false" class="border px-4 py-2 rounded-md">Cancel</button>
              <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md">Save</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Edit Mentor Modal -->
      <div v-if="showEditMentorModal" :style="{ backgroundColor: 'rgba(75, 85, 99, 0.75)' }"
        class="fixed inset-0 flex items-center justify-center z-50">
        <div class="bg-white text-gray-700  rounded-lg shadow-lg w-full max-w-md p-6">
          <h3 class="text-lg font-semibold mb-4">Edit Mentor</h3>
          <form @submit.prevent="handleEditMentor">
            <div class="space-y-4">
              <input v-model="selectedMentor.name" placeholder="Name" required class="w-full border px-3 py-2 rounded-md" />
            </div>
            <div class="flex justify-end space-x-2 mt-4">
              <button @click="showEditMentorModal = false" type="button" class="border px-4 py-2 rounded-md">Cancel</button>
              <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md">Update</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteMentorModal" :style="{ backgroundColor: 'rgba(75, 85, 99, 0.75)' }"
        class="fixed inset-0 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 text-center">
          <h3 class="text-lg font-semibold text-red-600">Delete Mentor</h3>
          <p class="text-gray-700 mt-2">Are you sure you want to delete <strong>{{ selectedMentor?.name }}</strong>?</p>
          <div class="mt-4 flex justify-center space-x-3">
            <button @click="showDeleteMentorModal = false" class="border text-gray-700  px-4 py-2 rounded-md">Cancel</button>
            <button @click="handleDeleteMentor" class="bg-red-600 text-white px-4 py-2 rounded-md">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Search & Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="p-4 border-b border-gray-200 flex justify-between items-center">
        <div class="relative w-64">
          <input v-model="searchQuery" type="text" placeholder="Search mentors..."
            class="pl-8 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
          <svg class="w-4 h-4 text-gray-500 absolute left-2 top-1/2 transform -translate-y-1/2" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">No</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Mentor ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(mentor, index) in filteredMentors" :key="mentor.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">{{ index + 1 }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm  text-gray-700">{{ mentor.id }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ mentor.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex space-x-2">
                   <button @click="openEditModal(mentor)" class="text-blue-600 hover:text-blue-900 cursor-pointer whitespace-nowrap !rounded-button">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z">
                      </path>
                    </svg>
                  </button>
                 <button @click="openDeleteModal(mentor)" class="text-red-600 hover:text-red-900 cursor-pointer whitespace-nowrap !rounded-button">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                      </path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useMentorStore } from '../store/mentorStore';

const mentorStore = useMentorStore();
const showAddMentorModal = ref(false);
const showEditMentorModal = ref(false);
const showDeleteMentorModal = ref(false);
const searchQuery = ref('');

const newMentor = ref({ name: '' });
const selectedMentor = ref(null);

const filteredMentors = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return mentors.value.filter(mentor =>
    mentor.name.toLowerCase().includes(query) ||
    String(mentor.id).toLowerCase().includes(query)
  );
});

onMounted(() => {
  mentorStore.fetchMentors();
});

const mentors = computed(() => mentorStore.mentors);

async function handleAddMentor() {
  await mentorStore.addMentor({ name: newMentor.value.name });
  showAddMentorModal.value = false;
  newMentor.value.name = '';
}

function openEditModal(mentor) {
  selectedMentor.value = { ...mentor };
  showEditMentorModal.value = true;
}

async function handleEditMentor() {
  await mentorStore.updateMentor(selectedMentor.value);
  showEditMentorModal.value = false;
  selectedMentor.value = null;
}

function openDeleteModal(mentor) {
  selectedMentor.value = { ...mentor };
  showDeleteMentorModal.value = true;
}

async function handleDeleteMentor() {
  await mentorStore.deleteMentor(selectedMentor.value.id);
  showDeleteMentorModal.value = false;
  selectedMentor.value = null;
}
</script>

<style scoped>
</style>
