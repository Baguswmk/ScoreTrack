<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold ">Students</h2>
      <button @click="showAddStudentModal = true"
        class="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 cursor-pointer whitespace-nowrap !rounded-button">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6">
          </path>
        </svg>
        <span>Add Student</span>
      </button>
      <div v-if="showAddStudentModal" :style="{ backgroundColor: 'rgba(75, 85, 99, 0.75)' }"
        class="fixed inset-0 overflow-y-auto h-full w-full flex items-center justify-center z-50">
        <div class="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-xl font-semibold text-gray-800">Add New Student</h3>
          </div>
          <form @submit.prevent="handleAddStudent" class="px-6 py-4">
            <div class="space-y-4">
              <div>
                <label for="studentId" class="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                <input id="studentId" v-model="newStudent.id" type="text" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter student ID" />
              </div>
              <div>
                <label for="studentName" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input id="studentName" v-model="newStudent.name" type="text" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter student name" />
              </div>
            </div>
            <div class="flex justify-end space-x-3 mt-6">
              <button type="button" @click="showAddStudentModal = false"
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent whitespace-nowrap !rounded-button">
                Cancel
              </button>
              <button type="submit"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 whitespace-nowrap !rounded-button">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <div v-if="showEditStudentModal" :style="{ backgroundColor: 'rgba(75, 85, 99, 0.75)' }"
        class="fixed inset-0  flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
          <h3 class="text-lg text-gray-700 font-semibold mb-4">Edit Student</h3>
          <form @submit.prevent="handleEditStudent">
            <div class="space-y-4">
              <input v-model="selectedStudent.name" placeholder="Name" required
                class="w-full text-gray-700 border px-3 py-2 rounded-md" />
            </div>
            <div class="flex justify-end space-x-2 mt-4">
              <button @click="showEditStudentModal = false" type="button"
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 curosr-pointer">
                Cancel</button>
              <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md curosr-pointer">Update</button>
            </div>
          </form>
        </div>
      </div>
      <div v-if="showDeleteStudentModal" :style="{ backgroundColor: 'rgba(75, 85, 99, 0.75)' }"
        class="fixed inset-0 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 text-center">
          <h3 class="text-lg font-semibold text-red-600">Delete Student</h3>
          <p class="text-gray-700 mt-2">Are you sure you want to delete <strong>{{ selectedStudent?.name }}</strong>?
          </p>
          <div class="mt-4 flex justify-center space-x-3">
            <button @click="showDeleteStudentModal = false"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 curosr-pointer">
              Cancel</button>
            <button @click="handleDeleteStudent" class="bg-red-600 text-white px-4 py-2 rounded-md">Delete</button>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="p-4 border-b border-gray-200 flex flex-wrap justify-between items-center">
        <div class="relative w-64 mb-2 sm:mb-0">
          <input v-model="searchQuery" type="text" placeholder="Search students..."
            class="pl-8 pr-4 py-2 w-full rounded-md border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
          <svg class="w-4 h-4 text-gray-500 absolute left-2 top-1/2 transform -translate-y-1/2" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                No
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Student ID
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <template v-if="filteredStudents.length > 0">
              <tr v-for="(student, index) in filteredStudents" :key="index" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                  {{ index + 1 }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {{ student.id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div>
                      <div class="text-sm text-gray-700">{{ student.name }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div class="flex space-x-2">
                    <button @click="openEditModal(student)"
                      class="text-blue-600 hover:text-blue-900 cursor-pointer whitespace-nowrap !rounded-button">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z">
                        </path>
                      </svg>
                    </button>
                    <button @click="openDeleteModal(student)"
                      class="text-red-600 hover:text-red-900 cursor-pointer whitespace-nowrap !rounded-button">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                        </path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </template>
            <tr v-else>
              <td colspan="4" class="text-center text-gray-500 py-6">Data tidak ditemukan.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStudentStore } from '../store/studentStore';
import { toast } from 'vue3-toastify';

const studentStore = useStudentStore();

const showAddStudentModal = ref(false);
const showEditStudentModal = ref(false);
const showDeleteStudentModal = ref(false);
const loading = ref(false);
const isDarkMode = ref(false);
const searchQuery = ref('');

const newStudent = ref({ id: '', name: '' });
const selectedStudent = ref(null);

const students = computed(() => studentStore.students);
const filteredStudents = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return students.value.filter(student =>
    student.name.toLowerCase().includes(query) ||
    String(student.id).toLowerCase().includes(query)
  );
});

onMounted(() => {
  studentStore.fetchStudents();
});

function resetForm() {
  newStudent.value = { id: '', name: '' };
}

async function handleAddStudent() {
  loading.value = true;
  try {
    await studentStore.addStudent({ ...newStudent.value });
    showAddStudentModal.value = false;
    resetForm();
    toast.success("Student added!");
  } catch (error) {
    toast.error("Failed to add student.");
  } finally {
    loading.value = false;
  }
}

function openEditModal(student) {
  selectedStudent.value = { ...student };
  showEditStudentModal.value = true;
}

async function handleEditStudent() {
  loading.value = true;
  try {
    await studentStore.updateStudent(selectedStudent.value);
    toast.success("Student updated!");
  } catch (err) {
    toast.error("Failed to update student.");
  } finally {
    showEditStudentModal.value = false;
    selectedStudent.value = null;
    loading.value = false;
  }
}

function openDeleteModal(student) {
  selectedStudent.value = { ...student };
  showDeleteStudentModal.value = true;
}

async function handleDeleteStudent() {
  loading.value = true;
  try {
    await studentStore.deleteStudent(selectedStudent.value.id);
    toast.success("Student deleted!");
  } catch (err) {
    toast.error("Failed to delete student.");
  } finally {
    showDeleteStudentModal.value = false;
    selectedStudent.value = null;
    loading.value = false;
  }
}
</script>
