<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold ">Grades</h2>
      <button @click="showAddModal = true"
        class="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 cursor-pointer">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span>Add Grade</span>
      </button>
    </div>
    <div v-if="showAddModal" :style="{ backgroundColor: 'rgba(75, 85, 99, 0.75)' }"
      class="fixed inset-0 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div class="relative bg-white text-gray-700 rounded-lg shadow-xl w-full max-w-md mx-4">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-xl font-semibold text-gray-800">Add Grade</h3>
        </div>
        <form @submit.prevent="handleAddGrade" class="px-6 py-4">
          <div class="space-y-4">
            <select v-model="newGrade.studentId" required class="w-full border px-3 py-2 rounded-md text-gray-700">
              <option value="" disabled>Select Student</option>
              <option v-for="student in students" :key="student.id" :value="student.id">
                {{ student.name }}
              </option>
            </select>
            <select v-model="newGrade.courseId" required class="w-full border px-3 py-2 rounded-md text-gray-700">
              <option value="" disabled>Select Course</option>
              <option v-for="course in courses" :key="course.id" :value="course.id">
                {{ course.name }}
              </option>
            </select>
            <select v-model="newGrade.semesterId" required class="w-full border px-3 py-2 rounded-md text-gray-700">
              <option value="" disabled>Select Semester</option>
              <option v-for="semester in semesters" :key="semester.id" :value="semester.id">
                {{ semester.name }}
              </option>
            </select>
            <input v-model="newGrade.score" type="number" placeholder="Score" required
              class="w-full border px-3 py-2 rounded-md" />
            <textarea v-model="newGrade.feedback" placeholder="Feedback"
              class="w-full border px-3 py-2 rounded-md"></textarea>
          </div>
          <div class="flex justify-end space-x-3 mt-6">
            <button type="button" @click="showAddModal = false" class="px-4 py-2 border rounded-md">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md">Save</button>
          </div>
        </form>
      </div>
    </div>
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="p-4 border-b border-gray-200 flex justify-between items-center">
        <div class="relative w-64">
          <input v-model="searchQuery" type="text" placeholder="Search by student or course name"
            class="pl-8 pr-4 py-2 w-full rounded-md border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
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
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">No</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Student</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Course</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Score</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Feedback</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <template v-if="filteredGrades.length > 0">
              <tr v-for="(grade, index) in filteredGrades" :key="grade.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 text-sm font-medium text-gray-700">{{ index + 1 }}</td>
                <td class="px-6 py-4 text-sm text-gray-700">{{ grade.Student?.name || '-' }}</td>
                <td class="px-6 py-4 text-sm text-gray-700">{{ grade.Course?.name || '-' }}</td>
                <td class="px-6 py-4 text-sm text-gray-700">{{ grade.score }}</td>
                <td class="px-6 py-4 text-sm text-gray-700">{{ grade.feedback }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <div class="flex space-x-2">
                    <button @click="openEditModal(grade)" class="text-blue-600 hover:text-blue-900">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button @click="openDeleteModal(grade)" class="text-red-600 hover:text-red-900">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </template>
            <tr v-else>
              <td colspan="6" class="text-center text-gray-500 py-6">Data tidak ditemukan.</td>
            </tr>
          </tbody>

        </table>
      </div>
    </div>
    <div v-if="showEditModal" :style="{ backgroundColor: 'rgba(75, 85, 99, 0.75)' }"
      class="fixed inset-0 flex items-center justify-center z-50">
      <div class="bg-white text-gray-700 rounded-lg shadow-lg w-full max-w-md p-6">
        <h3 class="text-lg font-semibold mb-4">Edit Grade</h3>
        <form @submit.prevent="handleEditGrade">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Student</label>
              <input type="text" :value="selectedGrade?.Student?.name || '-'" disabled
                class="w-full border px-3 py-2 rounded-md bg-gray-100 text-gray-700 cursor-not-allowed" />
            </div>
            <div>
              <label for="edit-course" class="block text-sm font-medium text-gray-700">Course</label>
              <select id="edit-course" v-model="selectedGrade.courseId" required
                class="w-full border px-3 py-2 rounded-md">
                <option disabled value="">Select a course</option>
                <option v-for="course in courses" :key="course.id" :value="course.id">
                  {{ course.name }}
                </option>
              </select>
            </div>
            <div>
              <label for="edit-semester" class="block text-sm font-medium text-gray-700">Semester</label>
              <select id="edit-semester" v-model="selectedGrade.semesterId" required
                class="w-full border px-3 py-2 rounded-md">
                <option disabled value="">Select a semester</option>
                <option v-for="semester in semesters" :key="semester.id" :value="semester.id">
                  {{ semester.name }}
                </option>
              </select>
            </div>
            <div>
              <label for="edit-score" class="block text-sm font-medium text-gray-700">Score</label>
              <input id="edit-score" type="number" v-model="selectedGrade.score" required
                class="w-full border px-3 py-2 rounded-md" />
            </div>
            <div>
              <label for="edit-feedback" class="block text-sm font-medium text-gray-700">Feedback</label>
              <textarea id="edit-feedback" v-model="selectedGrade.feedback"
                class="w-full border px-3 py-2 rounded-md"></textarea>
            </div>
          </div>
          <div class="flex justify-end space-x-2 mt-4">
            <button @click="showEditModal = false" type="button" class="border px-4 py-2 rounded-md">Cancel</button>
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md">Update</button>
          </div>
        </form>
      </div>
    </div>
    <div v-if="showDeleteModal" :style="{ backgroundColor: 'rgba(75, 85, 99, 0.75)' }"
      class="fixed inset-0 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 text-center">
        <h3 class="text-lg font-semibold text-red-600">Delete Grade</h3>
        <p class="text-gray-700 mt-2">Are you sure you want to delete this grade from <strong>{{
          selectedGrade?.Student?.name || 'Unknown Student' }}</strong>?</p>
        <div class="mt-4 flex justify-center space-x-3">
          <button @click="showDeleteModal = false" class="border text-gray-700  px-4 py-2 rounded-md">Cancel</button>
          <button @click="handleDeleteGrade" class="bg-red-600 text-white px-4 py-2 rounded-md">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useGradeStore } from '../store/gradeStore';
import { useCourseStore } from '../store/courseStore';
import { useSemesterStore } from '../store/semesterStore';
import { useStudentStore } from '../store/studentStore';
import { toast } from 'vue3-toastify';

const gradeStore = useGradeStore();
const courseStore = useCourseStore();
const semesterStore = useSemesterStore();
const studentStore = useStudentStore();

const showAddModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const searchQuery = ref('');
const selectedGrade = ref(null);
const loading = ref(false);

const newGrade = ref({
  studentId: '',
  courseId: '',
  semesterId: '',
  score: '',
  feedback: '',
});

const grades = computed(() => gradeStore.grades);
const courses = computed(() => courseStore.courses);
const semesters = computed(() => semesterStore.semesters);
const students = computed(() => studentStore.students);

const filteredGrades = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return grades.value.filter(g => {
    const studentName = g.Student?.name?.toLowerCase() || '';
    const courseName = g.Course?.name?.toLowerCase() || '';
    return studentName.includes(query) || courseName.includes(query);
  });
});

onMounted(async () => {
  await gradeStore.fetchGrades();
  await courseStore.fetchCourses();
  await semesterStore.fetchSemesters();
  await studentStore.fetchStudents();
});

async function handleAddGrade() {
  loading.value = true;
  try {
    await gradeStore.addGrade(newGrade.value);
    await gradeStore.fetchGrades();
    showAddModal.value = false;
    toast.success("Grade added successfully!");
    resetNewGrade();
  } catch (err) {
    toast.error("Failed to add grade.");
  } finally {
    loading.value = false;
  }
}

function openEditModal(grade) {
  selectedGrade.value = { ...grade };
  showEditModal.value = true;
}

async function handleEditGrade() {
  loading.value = true;
  try {
    await gradeStore.updateGrade(selectedGrade.value);
    await gradeStore.fetchGrades();
    showEditModal.value = false;
    selectedGrade.value = null;
    toast.success("Grade updated!");
  } catch (err) {
    toast.error("Failed to update grade.");
  } finally {
    loading.value = false;
  }
}

function openDeleteModal(grade) {
  selectedGrade.value = { ...grade };
  showDeleteModal.value = true;
}

async function handleDeleteGrade() {
  loading.value = true;
  try {
    await gradeStore.deleteGrade(selectedGrade.value.id);
    await gradeStore.fetchGrades();
    showDeleteModal.value = false;
    selectedGrade.value = null;
    toast.success("Grade deleted!");
  } catch (err) {
    toast.error("Failed to delete grade.");
  } finally {
    loading.value = false;
  }
}

function resetNewGrade() {
  newGrade.value = {
    studentId: '',
    courseId: '',
    semesterId: '',
    score: '',
    feedback: '',
  };
}
</script>
