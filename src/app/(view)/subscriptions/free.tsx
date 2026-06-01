"use client";

import React, { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	getFreeSubscriptionsApi,
	addFreeSubscriptionApi,
	viewFreeSubscriptionApi,
	removeFreeSubscriptionApi,
	renewFreeSubscriptionApi,
	getSubscriptionsApi,
	getUsersApi,
} from "@/lib/api/admin";
import { useCookies } from "react-cookie";
import {
	Eye,
	Loader2Icon,
	RefreshCwIcon,
	SearchIcon,
	Trash2Icon,
} from "lucide-react";
import { idk } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
	DialogFooter,
} from "@/components/ui/dialog";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface FreeSubData {
	id: number;
	user_id: number;
	plan_name: string;
	duration: string;
	price: string;
	currency: string;
	features: string[];
	renewal: string;
	status: string;
	store: any;
	storeTransactionId: any;
	created_at: string;
	updated_at: string;
	isRenew: boolean;
	user: {
		id: number;
		full_name: string;
		role: string;
		email: string;
		phone_number: any;
		address: any;
		status: string;
		avatar_url: string;
	};
}

function ViewFreeSubDialog({ id, token }: { id: number; token?: string }) {
	const [open, setOpen] = useState(false);

	const { data, isPending } = useQuery<idk>({
		queryKey: ["view_free_sub", id],
		enabled: open && !!token,
		queryFn: () => viewFreeSubscriptionApi({ id, token }),
	});

	const sub = (data as idk)?.data;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="ghost" size="icon" title="View details">
					<Eye className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>Free Subscription Details</DialogTitle>
				</DialogHeader>
				{isPending ? (
					<div className="flex justify-center items-center h-24">
						<Loader2Icon className="animate-spin" />
					</div>
				) : sub ? (
					<div className="space-y-4 max-h-96 overflow-y-auto">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="text-sm font-medium text-muted-foreground">
									USER NAME
								</label>
								<p className="text-sm font-semibold">
									{sub.user?.full_name ?? "Unnamed"}
								</p>
							</div>
							<div>
								<label className="text-sm font-medium text-muted-foreground">
									USER EMAIL
								</label>
								<p className="text-sm font-semibold">
									{sub.user?.email ?? "-"}
								</p>
							</div>
							<div>
								<label className="text-sm font-medium text-muted-foreground">
									Plan Name
								</label>
								<p className="text-sm font-semibold">{sub.plan_name}</p>
							</div>
							<div>
								<label className="text-sm font-medium text-muted-foreground">
									Duration
								</label>
								<p className="text-sm font-semibold">{sub.duration}</p>
							</div>
							<div>
								<label className="text-sm font-medium text-muted-foreground">
									Price
								</label>
								<p className="text-sm font-semibold">${sub.price}</p>
							</div>
							<div>
								<label className="text-sm font-medium text-muted-foreground">
									Currency
								</label>
								<p className="text-sm font-semibold">{sub.currency ?? "-"}</p>
							</div>
							<div>
								<label className="text-sm font-medium text-muted-foreground">
									Status
								</label>
								<p className="text-sm font-semibold">{sub.status}</p>
							</div>
							<div>
								<label className="text-sm font-medium text-muted-foreground">
									Renewal
								</label>
								<p className="text-sm font-semibold">{sub.renewal}</p>
							</div>
							<div>
								<label className="text-sm font-medium text-muted-foreground">
									Store
								</label>
								<p className="text-sm font-semibold">{sub.store ?? "-"}</p>
							</div>
							<div>
								<label className="text-sm font-medium text-muted-foreground">
									Transaction ID
								</label>
								<p className="text-sm font-semibold">
									{sub.storeTransactionId ?? "-"}
								</p>
							</div>
							<div>
								<label className="text-sm font-medium text-muted-foreground">
									Created At
								</label>
								<p className="text-sm font-semibold">{sub.created_at}</p>
							</div>
							<div>
								<label className="text-sm font-medium text-muted-foreground">
									Updated At
								</label>
								<p className="text-sm font-semibold">{sub.updated_at}</p>
							</div>
						</div>
						{Array.isArray(sub.features) && sub.features.length > 0 && (
							<div>
								<label className="text-sm font-medium text-muted-foreground">
									Features
								</label>
								<div className="flex flex-wrap gap-2 mt-2">
									{sub.features.map((f: string) => (
										<Badge key={f} variant="secondary">
											{f}
										</Badge>
									))}
								</div>
							</div>
						)}
					</div>
				) : (
					<p className="text-sm text-muted-foreground">No data found.</p>
				)}
			</DialogContent>
		</Dialog>
	);
}

function RenewDialog({
	id,
	token,
	onSuccess,
}: {
	id: number;
	token?: string;
	onSuccess: () => void;
}) {
	const [open, setOpen] = useState(false);
	const [duration, setDuration] = useState<"Monthly" | "Yearly">("Monthly");

	const { mutate, isPending } = useMutation({
		mutationKey: ["renew_free_sub", id],
		mutationFn: () => renewFreeSubscriptionApi({ id, duration, token }),
		onError: (err: any) => toast.error(err?.message ?? "Failed to renew"),
		onSuccess: (res: idk) => {
			toast.success(res?.message ?? "Renewed successfully!");
			setOpen(false);
			onSuccess();
		},
	});

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="ghost" size="icon" title="Renew subscription">
					<RefreshCwIcon className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Renew Free Subscription</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					<div className="space-y-2">
						<Label>Duration</Label>
						<Select
							value={duration}
							onValueChange={(v) => setDuration(v as "Monthly" | "Yearly")}
						>
							<SelectTrigger className="w-full">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="Monthly">Monthly</SelectItem>
								<SelectItem value="Yearly">Yearly</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline" type="button">
							Cancel
						</Button>
					</DialogClose>
					<Button onClick={() => mutate()} disabled={isPending}>
						{isPending ? (
							<Loader2Icon className="animate-spin h-4 w-4" />
						) : (
							"Renew"
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

function UserSearchCombobox({
	token,
	dialogOpen,
	onChange,
}: {
	token?: string;
	dialogOpen: boolean;
	onChange: (id: string, label: string) => void;
}) {
	const [search, setSearch] = useState("");
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [selectedLabel, setSelectedLabel] = useState("");
	const containerRef = React.useRef<HTMLDivElement>(null);

	const { data: usersData, isFetching } = useQuery<idk>({
		queryKey: ["users_search_combobox", search],
		enabled: dialogOpen && !!token,
		queryFn: () => getUsersApi({ token, search }),
	});

	const users: idk[] = Array.isArray((usersData as idk)?.data?.data)
		? (usersData as idk).data.data
		: [];

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (
				containerRef.current &&
				!containerRef.current.contains(e.target as Node)
			) {
				setDropdownOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	function handleSelect(u: idk) {
		const label = `${u.full_name ?? u.email ?? `User #${u.id}`}${u.email ? ` (${u.email})` : ""}`;
		setSelectedLabel(label);
		setSearch(label);
		setDropdownOpen(false);
		onChange(String(u.id), label);
	}

	return (
		<div ref={containerRef} className="relative">
			<div className="flex items-center border rounded-md px-3 h-9 gap-2">
				<SearchIcon className="h-4 w-4 text-muted-foreground shrink-0" />
				<input
					className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
					placeholder="Search user by name or email..."
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);
						setDropdownOpen(true);
						if (e.target.value !== selectedLabel) {
							onChange("", "");
							setSelectedLabel("");
						}
					}}
					onFocus={() => setDropdownOpen(true)}
				/>
				{isFetching && (
					<Loader2Icon className="h-4 w-4 animate-spin text-muted-foreground shrink-0" />
				)}
			</div>
			{dropdownOpen && (
				<div className="absolute z-50 w-full mt-1 rounded-md border bg-popover shadow-md max-h-52 overflow-y-auto">
					{users.length === 0 ? (
						<p className="text-sm text-muted-foreground px-3 py-2">
							No users found.
						</p>
					) : (
						users.map((u: idk) => (
							<button
								key={u.id}
								type="button"
								className="w-full text-left text-sm px-3 py-2 hover:bg-accent hover:text-accent-foreground"
								onMouseDown={(e) => e.preventDefault()}
								onClick={() => handleSelect(u)}
							>
								{u.full_name ?? `User #${u.id}`}
								{u.email && (
									<span className="text-muted-foreground ml-1 text-xs">
										({u.email})
									</span>
								)}
							</button>
						))
					)}
				</div>
			)}
		</div>
	);
}

function AddFreeSubDialog({
	token,
	onSuccess,
}: {
	token?: string;
	onSuccess: () => void;
}) {
	const [open, setOpen] = useState(false);
	const [userId, setUserId] = useState("");
	const [subscriptionId, setSubscriptionId] = useState("");

	const { data: subsData } = useQuery<idk>({
		queryKey: ["subs_for_free_sub"],
		enabled: open && !!token,
		queryFn: () => getSubscriptionsApi({ token }),
	});

	const { mutate, isPending } = useMutation({
		mutationKey: ["add_free_sub"],
		mutationFn: () =>
			addFreeSubscriptionApi({
				body: { user_id: userId, subscription_id: subscriptionId },
				token,
			}),
		onError: (err: any) =>
			toast.error(err?.message ?? "Failed to add free subscription"),
		onSuccess: (res: idk) => {
			toast.success(res?.message ?? "Free subscription added!");
			setOpen(false);
			setUserId("");
			setSubscriptionId("");
			onSuccess();
		},
	});

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>Add Free Subscription</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Free Subscription</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					<div className="space-y-2">
						<Label>User</Label>
						<UserSearchCombobox
							token={token}
							dialogOpen={open}
							onChange={(id) => setUserId(id)}
						/>
					</div>
					<div className="space-y-2">
						<Label>Subscription Plan</Label>
						<Select value={subscriptionId} onValueChange={setSubscriptionId}>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select plan" />
							</SelectTrigger>
							<SelectContent>
								{Array.isArray(subsData?.data) &&
									subsData.data
										.filter((s: idk) => s.plan_name?.toLowerCase() !== "free")
										.map((s: idk) => (
											<SelectItem key={s.id} value={String(s.id)}>
												{s.plan_name ?? `Plan #${s.id}`} — {s.duration}
											</SelectItem>
										))}
							</SelectContent>
						</Select>
					</div>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline" type="button">
							Cancel
						</Button>
					</DialogClose>
					<Button
						onClick={() => mutate()}
						disabled={isPending || !userId || !subscriptionId}
					>
						{isPending ? (
							<Loader2Icon className="animate-spin h-4 w-4" />
						) : (
							"Add"
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default function Free() {
	const qcl = useQueryClient();
	const [{ token }] = useCookies(["token"]);
	const [isClient, setIsClient] = useState(false);
	const [searchInput, setSearchInput] = useState("");
	const [search, setSearch] = useState("");

	useEffect(() => {
		setIsClient(true);
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => setSearch(searchInput), 400);
		return () => clearTimeout(timer);
	}, [searchInput]);

	const { data, isPending, isError, error, refetch } = useQuery({
		queryKey: ["free_subscriptions", search],
		enabled: !!token && isClient,
		queryFn: async (): Promise<idk> => {
			try {
				const res: idk = await getFreeSubscriptionsApi({
					token,
					search: search || undefined,
				});
				if (!res || !Array.isArray(res?.data))
					throw new Error("Invalid response");
				return res;
			} catch (err: any) {
				throw new Error(err?.message || "Failed to load free subscriptions");
			}
		},
		retry: 1,
		staleTime: 0,
	});

	const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
		mutationKey: ["delete_free_sub"],
		mutationFn: async (id: number) => {
			if (!token) throw new Error("Unauthorized request");
			return removeFreeSubscriptionApi({ id, token });
		},
		onError: (err: any) => toast.error(err?.message ?? "Failed to remove"),
		onSuccess: async (res: idk) => {
			toast.success(res?.message ?? "Removed successfully!");
			await qcl.invalidateQueries({ queryKey: ["free_subscriptions"] });
			refetch();
		},
	});

	if (!isClient) {
		return (
			<div className="flex justify-center items-center h-24">
				<Loader2Icon className="animate-spin" />
			</div>
		);
	}

	if (isPending) {
		return (
			<div className="flex justify-center items-center h-24 mx-auto">
				<Loader2Icon className="animate-spin" />
			</div>
		);
	}

	if (isError) {
		return (
			<Card className="border-destructive/50">
				<CardHeader>
					<CardTitle className="text-destructive">
						{error?.message || "Something went wrong"}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Button onClick={() => refetch()} variant="outline">
						Retry
					</Button>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center gap-4">
				{/* <div className="flex items-center border rounded-md px-3 h-9 gap-2 w-72">
					<SearchIcon className="h-4 w-4 text-muted-foreground shrink-0" />
					<input
						className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
						placeholder="Search by transaction ID..."
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
					/>
				</div> */}
				<div className=""></div>
				<AddFreeSubDialog
					token={token}
					onSuccess={() => {
						qcl.invalidateQueries({ queryKey: ["free_subscriptions"] });
						refetch();
					}}
				/>
			</div>

			{!data?.data?.length ? (
				<Card>
					<CardHeader>
						<CardTitle>No free subscriptions found</CardTitle>
					</CardHeader>
				</Card>
			) : (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>USER NAME</TableHead>
							<TableHead>USER EMAIL</TableHead>
							<TableHead>PLAN NAME</TableHead>
							<TableHead>DURATION</TableHead>
							<TableHead>PRICE</TableHead>
							<TableHead>STATUS</TableHead>
							<TableHead>RENEWAL</TableHead>
							<TableHead>ACTION</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data?.data?.map((sub: FreeSubData) => (
							<TableRow key={sub?.id ?? Math.random()}>
								<TableCell>{sub?.user?.full_name ?? "Unnamed"}</TableCell>
								<TableCell>{sub?.user?.email ?? "-"}</TableCell>
								<TableCell>{sub?.plan_name ?? "Unnamed"}</TableCell>
								<TableCell>{sub?.duration ?? "-"}</TableCell>
								<TableCell>${sub?.price ?? "0"}</TableCell>
								<TableCell>
									<Badge variant="secondary">{sub?.status ?? "-"}</Badge>
								</TableCell>
								<TableCell>{sub?.renewal ?? "-"}</TableCell>
								<TableCell className="flex items-center gap-1">
									<ViewFreeSubDialog id={sub.id} token={token} />

									{sub.isRenew && (
										<RenewDialog
											id={sub.id}
											token={token}
											onSuccess={() => {
												qcl.invalidateQueries({
													queryKey: ["free_subscriptions"],
												});
												refetch();
											}}
										/>
									)}

									<AlertDialog>
										<AlertDialogTrigger asChild>
											<Button size="icon" variant="ghost" disabled={isDeleting}>
												{isDeleting ? (
													<Loader2Icon className="animate-spin text-destructive" />
												) : (
													<Trash2Icon className="text-destructive" />
												)}
											</Button>
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle>Are you sure?</AlertDialogTitle>
												<AlertDialogDescription>
													Remove free subscription for "{sub?.plan_name}" (User
													#{sub?.user_id}). This can't be undone.
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Cancel</AlertDialogCancel>
												<AlertDialogAction onClick={() => deleteMutate(sub.id)}>
													Remove
												</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</div>
	);
}
