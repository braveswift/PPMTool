package yanhong.ppmtool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import yanhong.ppmtool.domain.Backlog;
import yanhong.ppmtool.domain.Project;
import yanhong.ppmtool.exceptions.ProjectIdException;
import yanhong.ppmtool.repositories.BacklogRepository;
import yanhong.ppmtool.repositories.ProjectRepository;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private BacklogRepository backlogRepository;

    public Project saveOrUpdateProject(Project project) {

        try {
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());


            if(project.getId() == null) {
                Backlog backlog = new Backlog();
                project.setBacklog(backlog);
                backlog.setProject(project);
                backlog.setProjectIdentifier(project.getProjectIdentifier());
            }

            if (project.getId() != null) {
                project.setBacklog(backlogRepository.findByProjectIdentifier(project.getProjectIdentifier()));
            }

            return projectRepository.save(project);

        } catch (Exception e) {
            throw new ProjectIdException("Project ID '" + project.getProjectIdentifier().toUpperCase() +
                    "' already exits.");
        }

    }

    public Project findProjectByIdentifier(String projectId) {
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
        if (project == null) {
            throw new ProjectIdException("Project ID '" + projectId +
                    "' does not exits.");
        }

        return project;
    }

    public  Iterable<Project> findAllProject() {
        return projectRepository.findAll();
    }

    public void deleteProjectById(String projectId) {
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
        if (project == null) {
            throw new ProjectIdException("Can not delete Project '" + projectId + "'. This project does not exist.");
        }
        projectRepository.delete(project);
    }
    
}
