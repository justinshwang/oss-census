import math
import numpy as np
import pandas as pd
import webbrowser, os
import yaml
from census_interactive.process import *
import json

# Launch visualizations
def main():
    ################ SETTINGS ################
    with open ("config.yaml", 'r') as stream:
        config = yaml.safe_load(stream)
    langs = [] if config["languages"] is None else config["languages"]
    # Single graph x axis options
    compare_options = [] if config["comparison"] is None else config["comparison"]
    ##########################################


    ## Comparison Graph Data

    data = dict()
#     # Contributor 
#     data["Contributor"] = dict()
#     for lang in langs:
#         dat_path = './census_interactive/data/raw/contributor_by_win/'+lang+'.csv'
#         store_path = './census_interactive/data/processed/contributor'
#         load_contributor(lang, dat_path, store_path)

#         # Save graph data to overall JSON data
#         with open('./census_interactive/data/processed/contributor/'+lang+'.json') as json_file:
#             add_data = json.load(json_file)
#             data["Contributor"][lang] = add_data

#     # Commits
#     data["Commit"] = dict()
#     for lang in langs:  
#         dat_path = './census_interactive/data/raw/commits_by_win/'+lang+'.csv'
#         store_path = './census_interactive/data/processed/commit'
#         load_commit(lang, dat_path, store_path)

#         # Save graph data to overall JSON data
#         with open('./census_interactive/data/processed/commit/'+lang+'.json') as json_file:
#             add_data = json.load(json_file)
#             data["Commit"][lang] = add_data


#     # Project 
#     data["Project"] = dict()
#     for lang in langs:
#         dat_path = './census_interactive/data/raw/final_proj_by_win/full.csv'
#         store_path = './census_interactive/data/processed/project'
#         load_project(lang, dat_path, store_path)

#         # Save graph data to overall JSON data
#         with open('./census_interactive/data/processed/project/'+lang+'.json') as json_file:
#             add_data = json.load(json_file)
#             data["Project"][lang] = add_data
            


    ## Single Graph Data 

    data = dict()    
    # Focus on Contributor for pie graphs
    data["Contributor"] = dict()
    
    for lang in langs:
        dat_path = './census_interactive/data/raw/contributor_by_win/'+lang+'.csv'
        store_path = './census_interactive/data/processed/contributor'
            
        # All Years
        year_option = "all"
        all_years = dict()
        for compare_option in compare_options:
            compare_option = compare_option.lower()
            load_contributor_pie(lang, dat_path, store_path, compare_option, year_option)

            # Save graph data to overall JSON data
            with open('./census_interactive/data/processed/contributor/'+lang+'.json') as json_file:
                add_data = json.load(json_file)
                all_years[lang] = add_data
        data["Contributor"]["All Years"] = all_years
        
        # Single Year
        year_option = "single"
        single_year = dict()
        for compare_option in compare_options:
            compare_option = compare_option.lower()
            load_contributor_pie(lang, dat_path, store_path, compare_option, year_option)

            # Save graph data to overall JSON data
            with open('./census_interactive/data/processed/contributor/'+lang+'.json') as json_file:
                add_data = json.load(json_file)
                all_years[lang] = add_data
        data["Contributor"]["Single Year"] = single_year
        

    # Combine all JSON to one dictionary in js/
    with open('./js/data.js', 'w') as out_file:
        out_file.write('var data = %s;' % json.dumps(data,indent=4, sort_keys=True))
        out_file.write('var data = %s;' % json.dumps(data,indent=4, sort_keys=True))


if __name__== "__main__" :
    main()    