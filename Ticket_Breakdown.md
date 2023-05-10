# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### User story:

- As a Facility owner I would like to assing custom IDs to my Agents, which would be included in the shifts reports

---

This task assumes that there should be an extra custom agent ID data included in the `getShiftsByFacility` function, which needs to be provided by the Facility for each agent.

Here are the list of questions that comes to my mind

- How Facilities should provide Custom IDs to their Agents. For example let's assume we might have Agent settings page in the Facility profile, where Facilities might edit Agents information. => Meaning we need an extra input field in the application UI.

- How to display the reports, if the custom IDs are not provided? Should we rollback the agentID to internal ID the reports used before?

- Since reports are generated as PDFs, customers might need to regenerate their previous reports with newly provided custom Agent IDs

---

### Technical tasks by roles


#### Backend

- Task: Add new `customId` field into Agents table
  - Database is migrated
  - No braking changes are made
- Task: Add ability to assign custom IDs to Facility agents
  - API returns `customId` field in the agent metadata
  - API updates the `customId` field value agents `create` and `update`
- Task: Add custom agend IDs into PDFs for `generateReport`
  - The PDFs contain custom IDS provided by facilities
  - Reports with missing `customId` are generated as expected (rollback to internal id or keep empty)

#### FrontEnd

- Task: Implement the UI for adding custom IDs to Facility agents
  - Implement to visual FE part where Facilities update the agentIds
  - Implement update actions with mocked data (e.g. MSW)
  - Connect to the real API
  - Q&A

