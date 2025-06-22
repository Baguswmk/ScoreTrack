<template>
    <div class="min-h-screen flex items-center justify-center px-4">
        <div :class="[
            'w-full max-w-md p-8 rounded-lg shadow-lg transition-all duration-300',
            isDarkMode ? 'bg-gray-800' : 'bg-white'
        ]">
            <div class="text-center mb-8">
                <h1 class="text-2xl font-bold" :class="isDarkMode ? 'text-white' : 'text-gray-800'">Student Score
                    Management</h1>
            </div>
            <form @submit.prevent="login">
                <!-- EMAIL -->
                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'">Email</label>
                    <BaseInput id="email" type="email" placeholder="Enter your email" v-model="email"
                        :inputClass="isDarkMode
                            ? 'bg-gray-700 text-white border-gray-600 w-full px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                            : 'bg-white text-gray-800 border-gray-300 w-full px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'">
                        <template #prefix>
                            <el-icon class="absolute right-0  text-gray-400">
                                <Message :color="isDarkMode ? '#D1D5DB' : '#374151'" />
                            </el-icon>


                        </template>
                    </BaseInput>
                </div>

                <!-- PASSWORD -->
                <div class="mb-6">
                    <label for="password" class="block text-sm font-medium mb-2"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'">Password</label>
                    <BaseInput id="password" type="password" placeholder="Enter your password" v-model="password"
                        :inputClass="isDarkMode
                            ? 'bg-gray-700 text-white border-gray-600 w-full px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                            : 'bg-white text-gray-800 border-gray-300 w-full px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'">
                        <template #prefix>
                            <el-icon class="absolute right-0  text-gray-400">
                                <Lock :color="isDarkMode ? '#D1D5DB' : '#374151'" />
                            </el-icon>
                        </template>
                    </BaseInput>
                </div>

                <div class="flex items-center justify-between mb-6">
                    <el-checkbox v-model="rememberMe" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                        class="text-sm">
                        Remember me
                    </el-checkbox>
                    <a href="#" class="text-sm text-blue-500 hover:underline">Forgot password?</a>
                </div>

                <button type="submit"
                    class="w-full py-2 px-4 !rounded-button whitespace-nowrap cursor-pointer font-medium text-white bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Sign In
                </button>
            </form>
        </div>

        <!-- Dark Mode Toggle -->
        <button @click="toggleDarkMode" class="fixed top-4 right-4 p-2 rounded-full cursor-pointer focus:outline-none"
            :class="isDarkMode ? 'bg-gray-700 text-yellow-400' : 'bg-white text-gray-800 shadow-md'">
            <el-icon v-if="isDarkMode">
                <Sunny />
            </el-icon>
            <el-icon v-else>
                <Moon />
            </el-icon>
        </button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseInput from './BaseInput.vue';
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { Message, Lock, Sunny, Moon } from '@element-plus/icons-vue';

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const isDarkMode = ref(false);

const auth = useAuthStore();
const router = useRouter();


const login = async () => {
    try {
        await auth.login(email.value, password.value);
        toast.success("Login berhasil!");
        router.push('/dashboard');
    } catch (err) {
        toast.error("Login gagal. Periksa kembali.");
    }
};


const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
};
</script>
