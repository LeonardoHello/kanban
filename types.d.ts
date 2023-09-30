type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

interface Database {
	public: {
		Tables: {
			boards: {
				Row: {
					created_at: string;
					id: string;
					name: string;
					user_id: string | null;
				};
				Insert: {
					created_at?: string;
					id?: string;
					name: string;
					user_id?: string | null;
				};
				Update: {
					created_at?: string;
					id?: string;
					name?: string;
					user_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "boards_user_id_fkey";
						columns: ["user_id"];
						referencedRelation: "users";
						referencedColumns: ["id"];
					}
				];
			};
			columns: {
				Row: {
					board_id: string;
					created_at: string;
					id: string;
					name: string;
				};
				Insert: {
					board_id: string;
					created_at?: string;
					id?: string;
					name: string;
				};
				Update: {
					board_id?: string;
					created_at?: string;
					id?: string;
					name?: string;
				};
				Relationships: [
					{
						foreignKeyName: "columns_board_id_fkey";
						columns: ["board_id"];
						referencedRelation: "boards";
						referencedColumns: ["id"];
					}
				];
			};
			subtasks: {
				Row: {
					created_at: string;
					id: string;
					is_completed: boolean;
					name: string;
					task_id: string;
				};
				Insert: {
					created_at?: string;
					id?: string;
					is_completed?: boolean;
					name: string;
					task_id: string;
				};
				Update: {
					created_at?: string;
					id?: string;
					is_completed?: boolean;
					name?: string;
					task_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "subtasks_task_id_fkey";
						columns: ["task_id"];
						referencedRelation: "tasks";
						referencedColumns: ["id"];
					}
				];
			};
			tasks: {
				Row: {
					column_id: string;
					created_at: string;
					description: string | null;
					id: string;
					name: string;
				};
				Insert: {
					column_id: string;
					created_at?: string;
					description?: string | null;
					id?: string;
					name: string;
				};
				Update: {
					column_id?: string;
					created_at?: string;
					description?: string | null;
					id?: string;
					name?: string;
				};
				Relationships: [
					{
						foreignKeyName: "tasks_column_id_fkey";
						columns: ["column_id"];
						referencedRelation: "columns";
						referencedColumns: ["id"];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}

type Tables<T extends keyof Database["public"]["Tables"]> =
	Database["public"]["Tables"][T]["Row"];
