import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchProjects = async () => {
  // Replace with actual API endpoint
  const response = await fetch('/api/projects');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const createProject = async (newProject) => {
  const response = await fetch('/api/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newProject),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};
