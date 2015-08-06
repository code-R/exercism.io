class RenameColumnFromStringToJsonForSubmissions < ActiveRecord::Migration
  def change
    execute "ALTER TABLE submissions ALTER COLUMN analysis TYPE json USING (analysis::json);"
  end
end
