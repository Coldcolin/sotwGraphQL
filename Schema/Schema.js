// const Project = require('../models/Project');
const userModel = require('../models/users');
const { projects, clients} = require('../sampleData');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLEnumType,
    GraphQLFloat
  } = require('graphql');

  const userType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      phone: { type: GraphQLString },
      image: {type: GraphQLString},
      imageId: {type: GraphQLString},
      overallRating: {type: GraphQLFloat},
      stack: {type: GraphQLString},
      role: {type: GraphQLString},
      cohort: {type: GraphQLInt},
    }),
  });

  // const ProjectType = new GraphQLObjectType({
  //   name: 'Project',
  //   fields: () => ({
  //     id: { type: GraphQLID },
  //     name: { type: GraphQLString },
  //     description: { type: GraphQLString },
  //     status: { type: GraphQLString },
  //     client: {
  //       type: ClientType,
  //       resolve(parent, args) {
  //         // return clients.findById(parent.clientId);
  //         return clients.find(client => client.id === parent.clientId);
  //       },
  //     },
  //   }),
  // });

  const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      user: {
        type: userType,
        args: {id: {type: GraphQLID}},
        resolve(parent, args) {
          return userModel.findById(args.id);
        },
      },  
      users:{
        type: new GraphQLList(userType),
        resolve(parent, args){
          return userModel.find().where("role").equals("student");
        }
      } ,   
      // project: {
      //   type: ProjectType,
      //   args: {id: {type: GraphQLID}},
      //   resolve(parent, args) {
      //     return projects.find(project => project.id === args.id);
      //   },
      // },  
      // projects:{
      //   type: new GraphQLList(ProjectType),
      //   resolve(parent, args){
      //     return projects;
      //   }
      // }    
    },
  });

  const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      // Add a client
      // addClient: {
      //   type: ClientType,
      //   args: {
      //     name: { type: GraphQLNonNull(GraphQLString) },
      //     email: { type: GraphQLNonNull(GraphQLString) },
      //     phone: { type: GraphQLNonNull(GraphQLString) },
      //   },
      //   resolve(parent, args) {
      //     const client = new Client({
      //       name: args.name,
      //       email: args.email,
      //       phone: args.phone,
      //     });
  
      //     return client.save();
      //   },
      // },
      // // Delete a client
      // deleteClient: {
      //   type: ClientType,
      //   args: {
      //     id: { type: GraphQLNonNull(GraphQLID) },
      //   },
      //   resolve(parent, args) {
      //     Project.find({ clientId: args.id }).then((projects) => {
      //       projects.forEach((project) => {
      //         project.deleteOne();
      //       });
      //     });
  
      //     return Client.findByIdAndRemove(args.id);
      //   },
      // },
      // // Add a project
      // addProject: {
      //   type: ProjectType,
      //   args: {
      //     name: { type: GraphQLNonNull(GraphQLString) },
      //     description: { type: GraphQLNonNull(GraphQLString) },
      //     status: {
      //       type: new GraphQLEnumType({
      //         name: 'ProjectStatus',
      //         values: {
      //           new: { value: 'Not Started' },
      //           progress: { value: 'In Progress' },
      //           completed: { value: 'Completed' },
      //         },
      //       }),
      //       defaultValue: 'Not Started',
      //     },
      //     clientId: { type: GraphQLNonNull(GraphQLID) },
      //   },
      //   resolve(parent, args) {
      //     const project = new Project({
      //       name: args.name,
      //       description: args.description,
      //       status: args.status,
      //       clientId: args.clientId,
      //     });
  
      //     return project.save();
      //   },
      // },
      // // Delete a project
      // deleteProject: {
      //   type: ProjectType,
      //   args: {
      //     id: { type: GraphQLNonNull(GraphQLID) },
      //   },
      //   resolve(parent, args) {
      //     return Project.findByIdAndRemove(args.id);
      //   },
      // },
      // // Update a project
      // updateProject: {
      //   type: ProjectType,
      //   args: {
      //     id: { type: GraphQLNonNull(GraphQLID) },
      //     name: { type: GraphQLString },
      //     description: { type: GraphQLString },
      //     status: {
      //       type: new GraphQLEnumType({
      //         name: 'ProjectStatusUpdate',
      //         values: {
      //           new: { value: 'Not Started' },
      //           progress: { value: 'In Progress' },
      //           completed: { value: 'Completed' },
      //         },
      //       }),
      //     },
      //   },
      //   resolve(parent, args) {
      //     return Project.findByIdAndUpdate(
      //       args.id,
      //       {
      //         $set: {
      //           name: args.name,
      //           description: args.description,
      //           status: args.status,
      //         },
      //       },
      //       { new: true }
      //     );
      //   },
      // },
    },
  });

  module.exports = new GraphQLSchema({
    query: RootQuery,
    // mutation
  });