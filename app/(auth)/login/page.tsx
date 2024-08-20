"use client";


import { Formik, Form, Field, ErrorMessage } from 'formik';
import LoginSchema from '@schemas/login';
import axios from 'axios';
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { useRouter } from 'next/navigation'; // Import useRouter


const Login = () => {
  const router = useRouter(); // Initialize useRouter inside the component

  const handleSubmit = async (values: any) => {
    try {
      const response = await axios.post('/api/login', values);
      console.log(response.data); // handle response
      // Redirect to dashboard or another page after successful login
      router.push('/dashboard'); // Adjust the redirect path as needed
    } catch (error) {
      console.error(error); // handle error
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <Field
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="email"
                  name="email"
                />
                <ErrorMessage
                  className="text-red-500 text-xs italic mt-1"
                  name="email"
                  component="div"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <Field
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="password"
                  name="password"
                />
                <ErrorMessage
                  className="text-red-500 text-xs italic mt-1"
                  name="password"
                  component="div"
                />
              </div>
              <button
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                type="submit"
                disabled={isSubmitting}
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
        <div className="mt-8 text-center">
          <h2 className="text-lg font-medium text-gray-600 mb-4">Or Sign in with</h2>
          <div className="flex justify-center space-x-6">
            <a
              href="/api/auth/signin/google"
              className="text-gray-700 hover:text-gray-900"
              aria-label="Sign in with Google"
            >
              <FcGoogle className="text-4xl" />
            </a>
            <a
              href="/api/auth/signin/linkedin"
              className="text-gray-700 hover:text-gray-900"
              aria-label="Sign in with LinkedIn"
            >
              <FaLinkedin className="text-4xl" />
            </a>
            <a
              href="/api/auth/signin/github"
              className="text-gray-700 hover:text-gray-900"
              aria-label="Sign in with GitHub"
            >
              <FaGithub className="text-4xl" />
            </a>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => router.push('/signup')}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;


