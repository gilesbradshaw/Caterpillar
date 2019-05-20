* index
  - parse the model
  - compile the contracts
  * register-model
    - creates sorted elements
    * register-models
      - (save model to repo)
      * continue-registration
        * create-parent-to-child-registration
          - add child bundle id to registry
          * ^ create-parent-to-child-registration
          * register-factory
            - deploy factory contract 
            * continue-factory-registration
              - registers factory in the registry
              * ^ register-factory
              * create-worklist-instances
                - deploys worklist contract
                - registers worklist
                * continue-worklist-creation
                  * ^ create-worklist-instances
                  * END
        * ^ register-models